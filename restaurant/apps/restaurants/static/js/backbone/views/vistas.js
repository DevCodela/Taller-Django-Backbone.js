var app = app || {};

app.mainView = Backbone.View.extend({
	el: '#app',

	events: {
		'keyup #buscador': 'buscarRestaurant',
		'click .categoria': 'selectCategoria',
		'click .pago': 'selectPago',
		'click #ciudad a': 'selectCiudad'
	},

	initialize: function(){
		app.restaurantsCollection.on('add', this.agregarRestaurantFiltro);
		app.restaurantsCollection.fetch();
		this.llegoFinal();
	},

	selectCategoria: function(ev){
		this.$('.list-group').html('');
		window.stade = true;
		window.categoria = $(ev.target).attr('id');
		app.restaurantCategoria = Backbone.Model.extend({
			urlRoot: 'api/categorias/' + window.categoria + '/restaurants/'
		});
		var restaurantsCategoria = Backbone.Collection.extend({
			model: app.restaurantCategoria,
			url: '/api/categorias/' + window.categoria + '/restaurants/'
		});

		app.restaurantsCategoriaCollection = new restaurantsCategoria();

		if(window.categoria == 0){
			if(window.ciudad>0 && window.pago>0){
				this.filtroCiudadPago();
			}else if(window.ciudad > 0 && window.pago <= 0){
				this.filtroCiudad();
			}else if(window.pago > 0 && window.ciudad < 1){
				this.filtroPago();
			}else if(window.pago<0 && window.ciudad<1){
				app.restaurantsCollection.each(this.agregarRestaurant, this);
			}
		}else{
			if(window.ciudad > 0 && window.pago > 0){
				this.filtroCategoriaCiudadPago();
			}else if(window.ciudad > 0 && window.pago <= 0){
				this.filtroCategoriaCiudad();
			}else if(window.pago > 0 && window.ciudad < 1){
				this.filtroCategoriaPago();
			}else if(window.pago<0 && window.ciudad<1){
				this.filtroCategoria();
			}
		}
	},

	selectPago: function(ev){
		this.$('.list-group').html('');
		window.stade = true;
		window.pago = $(ev.target).attr('id');	
		var restaurantsPago = Backbone.Collection.extend({
			model: app.restaurantPago,
			url: '/api/payments/' + window.pago + '/restaurants/'
		});

		app.restaurantsPagoCollection = new restaurantsPago();

		if(window.pago == 0){
			if(window.ciudad>0 && window.categoria>0){
				this.filtroCategoriaCiudad();
			}else if(window.ciudad>0 && window.categoria<=0){
				this.filtroCiudad();
			}else if(window.categoria>0 && window.ciudad<1){
				this.filtroCategoria();
			}else if(window.categoria<0 && window.ciudad<1){
				app.restaurantsCollection.each(this.agregarRestaurant, this);
			}
		}else{
			if(window.ciudad>0 && window.categoria>0){
				this.filtroCategoriaCiudadPago();
			}else if(window.ciudad>0 && window.categoria<=0){
				this.filtroCiudadPago();
			}else if(window.categoria>0 && window.ciudad<1){
				this.filtroCategoriaPago();
			}else if(window.categoria<0 && window.ciudad<1){
				this.filtroPago();
			}
		}
	},

	selectCiudad: function(ev){
		this.$('.list-group').html('');
		window.stade = true;
		window.ciudad = $(ev.target).attr('id');
		$('#city').html($(ev.target).text());

		var restaurantsCiudad = Backbone.Collection.extend({
			model: app.restaurantCiudad,
			url: '/api/ciudades/' + window.ciudad + '/restaurants/'
		});

		app.restaurantsCiudadCollection = new restaurantsCiudad();

		if(window.categoria>0 && window.pago>0){
			this.filtroCategoriaCiudadPago();
		}else if(window.categoria>0 && window.pago<=0){
			this.filtroCategoriaCiudad();
		}else if(window.categoria<=0 && window.pago>0){
			this.filtroCiudadPago();
		}else if(window.categoria<=0 && window.pago<=0){
			this.filtroCiudad();
		}
	},

	filtroCiudad: function(){
		var self = this;
		app.restaurantsCiudadCollection.fetch({success: function(ciudades){
			ciudades.each(self.agregarRestaurant, self);
		}});
	},

	filtroCategoria: function(){
		var self = this;
		app.restaurantsCategoriaCollection.fetch({success: function(categorias){
			categorias.each(self.agregarRestaurant, self);
		}});
	},

	filtroPago: function(){
		var self = this;
		app.restaurantsPagoCollection. fetch({success: function(pagos){
			pagos.each(self.agregarRestaurant, self);
		}});
	},

	filtroCategoriaCiudad: function(){
		var self = this;
		app.restaurantsCategoriaCollection.fetch({success: function(categorias){
			categorias.each(function(categoria){
				app.restaurantsCiudadCollection.fetch({success: function(ciudades){
					ciudades.each(function(ciudad){
						if(categoria.get('id') == ciudad.get('id')){
							self.agregarRestaurant(categoria);
						}
					});
				}});
			});
		}});
	},

	filtroCategoriaPago: function(){
		var self = this;
		app.restaurantsCategoriaCollection.fetch({success: function(categorias){
			categorias.each(function(categoria){
				app.restaurantsPagoCollection.fetch({success: function(pagos){
					pagos.each(function(pago){
						if(categoria.get('id') == pago.get('id')){
							self.agregarRestaurant(categoria);
						}
					});
				}});
			});
		}});
	},

	filtroCiudadPago: function(){
		var self = this;
		app.restaurantCiudadesCollection.fetch({success: function(ciudades){
			ciudades.each(function(ciudad){
				app.restaurantsPagoCollection.fetch({success: function(pagos){
					pagos.each(function(pago){
						if(ciudad.get('id') == pago.get('id')){
							self.agregarRestaurant(ciudad);
						}
					});
				}});
			});
		}});
	},

	filtroCategoriaCiudadPago: function(){
		var self = this;
		app.restaurantsCategoriaCollection.fetch({success: function(categorias){
			categorias.each(function(categoria){
				app.restaurantsCiudadesCollection.fetch({success: function(ciudades){
					ciudades.each(function(ciudad){
						app.restaurantsPago.fetch({success: function(pagos){
							pagos.each(function(pago){
								if(pago.get('id')==categoria.get('id') &&
									categoria.get('id')==ciudad.get('id') &&
									ciudad.get('id')==pago.get('id')){
									self.agregarRestaurant(categoria);
								}
							});
						}});
					});
				}});
			});
		}});
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

	events: {
		'click #detalleRestaurant': 'mostrarDetalle'
	},

	initialize: function(){
		var self = this;
		app.route.on('route:restaurant', function(){
			self.render();
		});
		app.route.on('route:detalleRestaurant', function(){
			self.render();
		});
	},

	render: function() {

		if(window.stadeUrl === "principal"){
			$('#restaurantGeneral').show();
			$('#detalle').hide();
			this.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.stadeUrl === "detalle"){
			$('#restaurantGeneral').hide();
			$('#detalle').show();
			if(this.model.get('id') == window.restaurantID){
				app.restaurantTip = Backbone.Model.extend({
					urlRoot: 'api/restaurants/' + window.restaurantID + '/tips/'
				});
				var restaurantTips = Backbone.Collection.extend({
					model: app.restaurantTip,
					url: '/api/restaurants/' + window.restaurantID + '/tips/'
				});
				$('#agregaTip').html('');
				app.Tips = new restaurantTips();	
				new app.DetalleRestaurantView({model:this.model});
				
				window.restaurantID = '';
			}
		}
		return this;
	},

	mostrarDetalle: function() {
		Backbone.history.navigate('restaurant/' + this.model.get('id'), {trigger: true});
	}
});

app.DetalleRestaurantView = Backbone.View.extend({
	el: '#detalle',

	events: {
		'click #agregar-tip': 'crearTip',
		'click #atras': 'atrasRestaurants'
	},

	initialize: function() {
		$(this.el).unbind();
		if(window.username.length == 0){
			$('#contenido').prop( "disabled", true );
			$('#agregar-tip').prop( "disabled", true );
		}else{
			$('#contenido').prop( "disabled", false );
			$('#agregar-tip').prop( "disabled", false );
		}

		new app.RestaurantDetalle({model:this.model});

		app.Tips.fetch();
		app.Tips.on('add', this.agregarTip);
	},

	agregarTip: function(modelo){
		var vista = new app.RestaurantTips({model: modelo});
		$('#agregaTip').append(vista.render().$el);
	},

	crearTip: function(){
		var dato = parseInt(this.mode.get('tips'));
		dato = dato + 1;
		this.mode.set({'tips': dato});
		var id = this.model.get('id');
		var newTip = new app.restaurantTip({
			"user": {
				"username": window.username,
			},

			"content": $('#contenido').val()
		});
		app.Tips.add(newTip);
	},

	atrasRestaurants: function(){
		Backbone.history.navigate('', {trigger: true});	
	}
});

app.RestaurantDetalle = Backbone.View.extend({
	el: '#datosRestaurant',
	template: _.template($('#tplRestaurantDetalle').html()),	

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	}
});

app.RestaurantTips = Backbone.View.extend({
	template: _.template($('#tplTipRestaurant').html()),
	className: 'media',

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});