    // This is a module for cloud persistance in mongolab - https://mongolab.com
    angular.module('ma1.mongolab', ['ngResource'])
	
	.factory('Skills', function($resource) {
	//https://api.mongolab.com/api/1/databases/esboslab/collections/projects?apiKey=nhTb9AwVIQFvw686dcq6K6CGYY-oUvUa
	
	var Skills = $resource('https://api.mongolab.com/api/1/databases' +
    '/miguelangelramos/collections/skills/:id',
    { apiKey: 'nhTb9AwVIQFvw686dcq6K6CGYY-oUvUa' }, {
    update: { method: 'PUT' }
    }
    );
	
	
    Skills.prototype.update = function(cb) {
    return Skills.update({id: this._id.$oid},
    angular.extend({}, this, {_id:undefined}), cb);
    };
     
    Skills.prototype.destroy = function(cb) {
    return Skills.remove({id: this._id.$oid}, cb);
    };
     
    return Skills;
    });
	
	