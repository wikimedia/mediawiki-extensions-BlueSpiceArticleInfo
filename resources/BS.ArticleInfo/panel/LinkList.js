Ext.define( 'BS.ArticleInfo.panel.LinkList', {
	extend: 'Ext.Panel',
	cls: 'bs-articleinfo-flyout-linklist-cnt',
	linkList: {},
	title: '',
	storeField: '',
	emptyText: '',
	initComponent: function () {
		this.store = new Ext.data.Store( {
			fields: [ this.storeField ],
			data: this.linkList,
			autoLoad: true
		} );

		this.template = new Ext.XTemplate(
			"<ul class='bs-articleinfo-flyout-linklist'>",
			"<tpl for='.'>",
				"<li>{" + this.storeField + "}</li>",
			"</tpl></ul>"
		);

		this.items = [
			new Ext.DataView( {
				store: this.store,
				itemTpl: this.template,
				emptyText: this.emptyText
			} )
		];

		this.callParent( arguments );
	}
});
