<?php
/**
 * ArticleInfo extension for BlueSpice
 *
 * Provides information about an article for status bar.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 3 of the License
 *
 * This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * This file is part of BlueSpice MediaWiki
 * For further information visit http://www.bluespice.com
 *
 * @author     Markus Glaser <glaser@hallowelt.com>
 * @author     Stephan Muggli <muggli@hallowelt.com>
 * @version    3.0.0
 * @package    BlueSpice_Extensions
 * @subpackage ArticleInfo
 * @copyright  Copyright (C) 2016 Hallo Welt! GmbH, All rights reserved.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU Public License v3
 * @filesource
 */

/**
 * Base class for ArticleInfo extension
 * @package BlueSpice_Extensions
 * @subpackage ArticleInfo
 */

namespace BlueSpice\ArticleInfo;

class Extension extends \BlueSpice\Extension {

	/**
	 * Hook-Handler for BS hook BsAdapterAjaxPingResult
	 * @param string $sRef
	 * @param array $aData
	 * @param integer $iArticleId
	 * @param array $aSingleResult
	 * @return boolean
	 */
	public static function onBsAdapterAjaxPingResult( $sRef, $aData, $iArticleId, $sTitle, $iNamespace, $iRevision, &$aSingleResult ) {
		if ( $sRef !== 'ArticleInfo' || empty( $iArticleId ) || empty( $iRevision ) ) return true;

		$oTitle = \Title::newFromID( $iArticleId );
		if ( is_null( $oTitle ) || !$oTitle->userCan( 'read' ) ) return true;

		$aSingleResult['success'] = true;
		$oUser = $this->getUser();

		if ( $aData[0] == 'checkRevision' ) {
			$aSingleResult['newRevision'] = false;
			$oRevision = \Revision::newFromTitle( $oTitle );
			if ( $oRevision->getId() > $iRevision
				&& !( //do not show own made revision when saving is in progress
					$aData[1] == 'edit' && $oUser->getID() > 0 && $oRevision->getUser() === $oUser->getID()
				)
			) {
				$aSingleResult['newRevision'] = true;
			}
		}
		return true;
	}

}
