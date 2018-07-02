Ext.define( 'BS.ArticleInfo.flyout.Base', {
	extend: 'BS.flyout.TwoColumnsBase',
	requires: ['BS.ArticleInfo.panel.LastEditedTime', 'BS.ArticleInfo.panel.LastEditedUser'],
	makeItemCallbacks: [],
	lastEditedTime: {},
	lastEditeUser: {},
	initComponent: function() {
		var me = this;
		this.allItems = this.makeItems();
		for( callbackIdx in this.makeItemCallbacks ) {
			var callback = this.makeItemCallbacks[callbackIdx];
			var newItems = bs.util.runCallback( callback, [], this );
			$.each( newItems, function( key, items ) {
				if( me.allItems[key] ) {
					me.allItems[key] = $.merge( items, me.allItems[key] );
				} else {
					me.allItems[key] = items;
				}
			} );
		}

		this.callParent(arguments);
	},
	makeCenterTwoItems: function() {
		return this.allItems.centerRight || [];
	},

	makeCenterOneItems: function() {
		return this.allItems.centerLeft || [];
	},

	makeTopPanelItems: function() {
		return this.allItems.top || [];
	},

	makeBottomPanelItems: function() {
		return this.allItems.bottom || [];
	},

	makeItems: function() {
		var items = [];

		if( $.isEmptyObject( this.lastEditedTime ) === false ) {
			items.push(
				Ext.create( 'BS.ArticleInfo.panel.LastEditedTime', {
					timestampText: this.lastEditedTime.timestamp,
					anchorURL: this.lastEditedTime.url
				} )
			);
		}
		if( $.isEmptyObject( this.lastEditedUser ) === false ) {
			items.push(
				Ext.create( 'BS.ArticleInfo.panel.LastEditedUser', {
					userText: this.lastEditedUser.userText,
					anchorURL: this.lastEditedUser.url
				} )
			);
		}

		return {
			top: items
		};
	}
} );
