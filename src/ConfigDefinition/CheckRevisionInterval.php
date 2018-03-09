<?php

namespace BlueSpice\ArticleInfo\ConfigDefinition;

class CheckRevisionInterval extends \BlueSpice\ConfigDefinition\IntSetting {

	public function getPaths() {
		return [
			static::MAIN_PATH_FEATURE . '/' . static::FEATURE_DATA_ANALYSIS . '/BlueSpiceArticleInfo',
			static::MAIN_PATH_EXTENSION . '/BlueSpiceArticleInfo/' . static::FEATURE_DATA_ANALYSIS ,
			static::MAIN_PATH_PACKAGE . '/' . static::PACKAGE_FREE . '/BlueSpiceArticleInfo',
		];
	}

	public function getLabelMessageKey() {
		return 'bs-articleinfo-pref-CheckRevisionInterval';
	}

	public function isRLConfigVar() {
		return true;
	}
}
