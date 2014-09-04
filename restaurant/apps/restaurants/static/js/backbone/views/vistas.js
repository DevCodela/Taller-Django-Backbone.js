var app = app || {};

app.mainView = Backbone.View.extend({
	el: '#app',

	initialize: function(){
		app.restaurantsCollection.on('add', this.agregarRestaurant);
		app.restaurantsCollection.fetch();
	},

	agregarRestaurant: function(modelo){
		var vista = new app.restaurantView({model: modelo});
		$('.list-group').append(vista.render().$el);
	}
});

app.restaurantView = Backbone.View.extend({
	template: _.template($('#tplRestaurant').html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});