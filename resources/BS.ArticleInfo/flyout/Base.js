Ext.define( 'BS.ArticleInfo.flyout.Base', {
	extend: 'BS.flyout.TwoColumnsBase',
	requires: ['BS.ArticleInfo.panel.LastEditedTime', 'BS.ArticleInfo.panel.LastEditedUser'],
	makeItemCallbacks: [],
	lastEditedTime: {},
	lastEditedUser: {},
	pageCategoryLinks: {},
	templateLinks: {},
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
		var topItems = [];

		if( $.isEmptyObject( this.lastEditedTime ) === false ) {
			topItems.push(
				Ext.create( 'BS.ArticleInfo.panel.LastEditedTime', {
					timestampText: this.lastEditedTime.timestamp,
					anchorURL: this.lastEditedTime.url
				} )
			);
		}
		if( $.isEmptyObject( this.lastEditedUser ) === false ) {
			topItems.push(
				Ext.create( 'BS.ArticleInfo.panel.LastEditedUser', {
					userText: this.lastEditedUser.userText,
					anchorURL: this.lastEditedUser.url
				} )
			);
		}

		var leftItems = [
			Ext.create( 'BS.ArticleInfo.panel.LinkList', {
				linkList: this.pageCategoryLinks,
				storeField: 'category_anchor',
				title: mw.message( 'bs-articleinfo-flyout-categorylinks-title' ).plain(),
				emptyText: mw.message( 'bs-articleinfo-flyout-categorylinks-emptytext' ).plain(),
				cls: 'bs-articleinfo-flyout-categorylist-cnt'
			} ),
			Ext.create( 'BS.ArticleInfo.panel.LinkList', {
				linkList: this.templateLinks,
				storeField: 'template_anchor',
				title: mw.message( 'bs-articleinfo-flyout-templatelinks-title' ).plain(),
				emptyText: mw.message( 'bs-articleinfo-flyout-templatelinks-emptytext' ).plain(),
				cls: 'bs-articleinfo-flyout-templatelist-cnt'
			} )
		];

		return {
			top: topItems,
			centerLeft: leftItems
		};
	}
} );
