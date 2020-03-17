<?php

namespace BlueSpice\ArticleInfo\Hook\SkinTemplateOutputPageBeforeExec;

use BlueSpice\ArticleInfo\Panel\Flyout;
use BlueSpice\Hook\SkinTemplateOutputPageBeforeExec;
use BlueSpice\SkinData;

class AddFlyout extends SkinTemplateOutputPageBeforeExec {
	protected function skipProcessing() {
		$title = $this->skin->getSkin()->getTitle();
		if ( !$title instanceof \Title
				|| !$title->exists()
				|| ( $title->getNamespace() === NS_SPECIAL )
				|| ( $title->getNamespace() === NS_MEDIA )
			) {
			return true;
		}
		if ( \MediaWiki\MediaWikiServices::getInstance()
			->getPermissionManager()
			->userCan( 'read', $this->skin->getSkin()->getUser(), $title ) === false ) {
			return true;
		}
		return false;
	}

	protected function doProcess() {
		$this->mergeSkinDataArray(
			SkinData::PAGE_DOCUMENTS_PANEL,
			[
				'articleinfo' => [
					'position' => 5,
					'callback' => function ( $sktemplate ) {
						return new Flyout( $sktemplate );
					}
				]
			]
		);

		return true;
	}
}
