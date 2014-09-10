var app = app || {};

app.mainView = Backbone.View.extend({
	el: '#app',

	events: {
		'keyup #buscador': 'buscarRestaurant',
	},

	initialize: function(){
		app.restaurantsCollection.on('add', this.agregarRestaurantFiltro);
		app.restaurantsCollection.fetch();
		this.llegoFinal();

		$('.categoria').on('click', this.selectCategoria);
		$('.pago').on('click', this.selectPago);
		$('#ciudad a').on('click', this.selectCiudad);
	},

	selectCategoria: function(){
		
		window.categoria = $(this).attr('id');
        var len = $('.categoria').length;
        var i = 0;

        while(i<len){
          if($('.categoria').eq(i).attr('id')!=window.categoria){
            $('.categoria').eq(i).prop("checked",false);
          }  

          else{
            $('.categoria#'+window.categoria).prop("checked",true);
          }  
          i++;
        }

        var restaurantsCategoria = Backbone.Collection.extend({
        	model: app.restaurantCategoria,
        	url: '/api/categorias/' + window.categoria + '/restaurants/'
        });
        app.restaurantsCategoriaCollection = new restaurantsCategoria();
        app.restaurantsCategoriaCollection.fetch();
        var filtro = app.restaurantsCollection.filter(function(modelo){
        	console.log(modelo);
        	return modelo;
        });
        var filter = app.restaurantsCategoriaCollection.filter(function(cat){
        	
        });
        console.log(filter);
	},

	selectPago: function(){
		window.pago = $(this).attr('id');
        var len = $('.pago').length;
        var i = 0;

        while(i<len){
          if($('.pago').eq(i).attr('id')!=window.pago){
            $('.pago').eq(i).prop("checked",false);
          }  

          else{
            $('pago#'+window.pago).prop("checked",true);
          }  
          i++;
        }

        var restaurantsPago = Backbone.Collection.extend({
        	model: app.restaurantPago,
        	url: '/api/payments/' + window.pago + '/restaurants/'
        });
        app.restaurantsPagoCollection = new restaurantsPago();
        app.restaurantsPagoCollection.fetch();
	},

	selectCiudad: function(){
	    window.ciudad = $(this).data('value');

	    var restaurantsCiudad = Backbone.Collection.extend({
			model: app.restaurantCiudad,
			url: '/api/ciudades/' + window.ciudad + '/restaurants/'
		});

	    app.restaurantsCiudadCollection = new restaurantsCiudad();
	    app.restaurantsCiudadCollection.fetch();
	},

	agregarRestaurant: function(modelo){
		var vista = new app.restaurantView({model: modelo});
		$('.list-group').append(vista.render().$el);
	},

	agregarRestaurantFiltro: function(modelo){
		if((window.cantidad>=modelo.get('id'))&&(window.cantidad-5 < modelo.get('id'))){
			var vista = new app.restaurantView({model: modelo});
			$('.list-group').append(vista.render().$el);
		}
	},

	buscarRestaurant: function(){
		window.stade = true;
		var cadBuscador = $('#buscador').val().toLowerCase();
		var filtro = app.restaurantsCollection.filter(function(modelo){
			var cadModelo = modelo.get('name').substring(0, cadBuscador.length).toLowerCase();
			if((cadBuscador === cadModelo) && (cadModelo.length == cadBuscador.length) &&
				(cadBuscador.length != 0) && (cadModelo.length != 0)){
				return modelo;
			}else if(cadModelo.length == 0 && cadBuscador.length == 0){
				window.stade = false;
				return modelo;
			}
		});
		this.agregarFiltro(filtro);
	},

	agregarFiltro: function(coleccionFiltro){
		this.$('.list-group').html('');
		if(window.stade === false){
			coleccionFiltro = coleccionFiltro.filter(function(modelo){
				if(window.cantidad >= modelo.get('id')){
					return modelo;
				}
			});
		}
		coleccionFiltro.forEach(this.agregarRestaurant, this);
	},

	llegoFinal: function(){
		var self = this;
		$(window).scroll(function(){
			if($(window).height() + $(window).scrollTop() == $(document).height()){
				if(window.stade === false){
					window.cantidad = window.cantidad + 5;
					app.restaurantsCollection.each(self.agregarRestaurantFiltro, self);
				}
			}
		});
	}
});

app.restaurantView = Backbone.View.extend({
	template: _.template($('#tplRestaurant').html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});