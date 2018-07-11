(function( mw, $, bs, undefined ) {
	bs.util.registerNamespace( 'bs.articleinfo' );

	bs.articleinfo.flyoutCallback = function( $body, data ) {
		var dfd = $.Deferred();
		Ext.create( 'BS.ArticleInfo.flyout.Base', {
			renderTo: $body[0],
			makeItemCallbacks: data.makeItemsCallbacks,
			lastEditedTime: data.lastEditedTime || {},
			lastEditedUser: data.lastEditedUser || {},
			pageCategoryLinks: data.categoryLinks || {},
			templateLinks: data.templateLinks || {}
		} );

		dfd.resolve();
		return dfd.promise();
	};

})( mediaWiki, jQuery, blueSpice );