Ext.define( 'BS.ArticleInfo.dialog.Subpages', {
	extend: 'MWExt.Dialog',
	requires: [ 'BS.tree.WikiSubPages' ],
	title: mw.message( 'bs-articleinfo-dialog-subpages-title' ).plain(),
	minHeight: 300,

	rootPage: '',

	makeItems: function() {
		this.subPageTree = new BS.tree.WikiSubPages( {
			treeRootPath: this.rootPage,
			renderLinks: true
		} );

		return [
			this.subPageTree
		];
	}
} );