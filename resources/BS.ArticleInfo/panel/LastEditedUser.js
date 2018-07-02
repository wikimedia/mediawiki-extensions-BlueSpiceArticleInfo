Ext.define( 'BS.ArticleInfo.panel.LastEditedUser', {
	extend: 'Ext.Panel',
	cls: 'bs-articleinfo-flyout-lastediteduser',
	userText: '',
	anchorURL: '',
	initComponent: function () {
		var html = '<div class="flyout-articleinfo-lastediteduser">';

		html += "<a href='" + this.anchorURL + "'>" + this.userText + "</a>";

		html += '</div>';

		this.html = html;

		this.callParent( arguments );
	}
})
