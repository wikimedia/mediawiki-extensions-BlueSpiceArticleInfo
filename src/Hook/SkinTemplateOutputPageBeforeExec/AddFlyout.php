<?php

namespace BlueSpice\ArticleInfo\Hook\SkinTemplateOutputPageBeforeExec;

use BlueSpice\ExtensionAttributeBasedRegistry;
use BlueSpice\Hook\SkinTemplateOutputPageBeforeExec;
use BlueSpice\SkinData;
use BlueSpice\ArticleInfo\Panel\Flyout;

class AddFlyout extends SkinTemplateOutputPageBeforeExec {
	protected function doProcess() {

		$this->mergeSkinDataArray(
			SkinData::PAGE_DOCUMENTS_PANEL,
			[
				'articleinfo' => [
					'callback' => function( $sktemplate ) {
						return new Flyout( $sktemplate );
					}
				]
			]
		);

		return true;
	}
}
