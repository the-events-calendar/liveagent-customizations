( function() { 
	// Safety check: jQuery should be present, but this may change unexpectedly
	if ( 'function' !== typeof jQuery ) {
		return;
	}

// Marketing alert
var marketingAlert =
'<div id="tribe-marketing-alert">'
+ '<div><span class="emoji">⚠️</span></div>'
+ '<div><strong>Heads up!</strong> Response times for support requests are a little longer than usual. Please expect up to 3 business days for a reply.'
+ '</div></div>'

// Portals
var componentPortals = 
'<div class="portals">'
+	'<div class="portals__portal">'
+ 	'<div class="portals__icon">'
+ 	'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-knowledgebase.png" />'
+ '</div>'
+ '<div class="portals__content">'
+ 	'<h2>Knowledgebase</h2>'
+ '<p>Articles and tutorials on everything from getting started to customizing the plugins, troubleshooting, integrations and more!</p>'
+ '<ul>'
+ 	'<li><a href="https://theeventscalendar.com/knowledgebase-category/primers/">Getting Started</a></li>'
+ 	'<li><a href="https://theeventscalendar.com/knowledgebase-category/errors/">Troubleshooting</a></li>'
+ 	'<li><a href="https://theeventscalendar.com/knowledgebase/themers-guide/">Customizations</a></li>'
+ '</ul>'
+ '<a href="https://theeventscalendar.com/knowledgebase/" class="button button--primary">Browse Articles</a>'
+ '</div>'
+ '</div>'
+ '<div class="portals__portal">'
+ 	'<div class="portals__icon">'
+ 		'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-docs.png" />'
+ 	'</div>'
+ 	'<div class="portals__content">'
+ 		'<h2>Technical Docs</h2>'
+ 		'<p>Documentation for everything under the hood of the plugins, including actions, filters, and example usages.</p>'
+ 		'<ul>'
+ 			'<li><a href="https://theeventscalendar.com/functions/">Functions & Template Tags</a></li>'
+ 			'<li><a href="https://theeventscalendar.com/plugin/the-events-calendar">The Events Calendar Docs</a></li>'
+ 			'<li><a href="https://theeventscalendar.com/plugin/event-tickets/">Event Tickets Docs</a></li>'
+ 		'</ul>'
+ 		'<a href="https://theeventscalendar.com/functions/" class="button button--primary">Visit Docs</a>'
+ 	'</div>'
+ '</div>'
+ '</div>'

var componentFeaturedContent = 
	'<section class="featured-content">'
	+ '<a href="https://support.theeventscalendar.com/153124-Themers-Guide">'
	+ 	'<article class="featured-content__item">'
	+ 		'<div class="featured-content__icon">'
	+ 			'<img src="https://theeventscalendar.com/content/uploads/2016/07/icon-brush-85x85.png" alt="" />'
	+ 		'</div>'
	+ 		'<div class="featured-content__body">'
	+				'<h4>Themer\'s Guide</h4>'
	+				'<p>Every calendar view is a template that can be overridden in your theme.</p>'
	+ 		'</div>'
	+ 	'</article>'
	+	'</a>'

	+ '<a href="https://theeventscalendar.com/extensions/">'
	+ 	'<article class="featured-content__item">'
	+ 		'<div class="featured-content__icon">'
	+ 			'<img src="https://theeventscalendar.com/content/uploads/2016/07/extensions-85x85.png" alt="" />'
	+ 		'</div>'
	+ 		'<div class="featured-content__body">'
	+				'<h4>Extension Library</h4>'
	+				'<p>Check out free mini-plugins to add additional features and settings to our plugins.</p>'
	+ 		'</div>'
	+ 	'</article>'
	+	'</a>'

	+ '<a href="https://theeventscalendar.com/content/uploads/2016/07/icon-code-1-85x85.png">'
	+ 	'<article class="featured-content__item">'
	+ 		'<div class="featured-content__icon">'
	+ 			'<img src="https://theeventscalendar.com/content/uploads/2016/07/icon-code-1-85x85.png" alt="" />'
	+ 		'</div>'
	+ 		'<div class="featured-content__body">'
	+				'<h4>Plugin Functions</h4>'
	+				'<p>Every available function in our products to use as filters for custom functionality.</p>'
	+ 		'</div>'
	+ 	'</article>'
	+	'</a>'

	+ '<a href="#">'
	+ 	'<article class="featured-content__item">'
	+ 		'<div class="featured-content__icon">'
	+ 			'<img src="https://theeventscalendar.com/content/uploads/2019/02/icon-return.png" alt="" />'
	+ 		'</div>'
	+ 		'<div class="featured-content__body">'
	+				'<h4>Orders & Refunds</h4>'
	+				'<p>Is the plugin not right for your project? Here\'s info on orders and refund requests.</p>'
	+ 		'</div>'
	+ 	'</article>'
	+	'</a>'
	+'</section>'

var componentInterstitial = 
	'<div class="interstitial interstitial--primary">'
	+	'<div class="interstitial__icon">'
	+ 	'<img src="https://theeventscalendar.com/content/themes/tribe-ecp/img/icons/icon-support-forum.png">'
	+ '</div>'
	+ '<div class="interstitial__content">'
	+ 	'<h3>Looking for More Help?</h3>'
	+ 	'<p>If you have looked through the documentation and knowledgebase and still have questions, then reach out to our friendly support staff and we will help you out.</p>'
	+ 	'<div class="interstitial__actions">'
	+ 		'<a href="https://support.theeventscalendar.com/submit_ticket" class="button button--secondary">Open Ticket</a>'
	+ 		'<a href="https://wordpress.org/support/plugin/the-events-calendar/" class="interstitial__text-link">Free plugin support</a>'
	+ 	'</div>'
	+ '</div>'
+ '</div>'

jQuery( function( $ ) { 

	// This form currently is embedded in the portal homepage
	var $presalesForm = $( '#presales-form' )

	// Test if the current user appears to be logged in
	var isLoggedIn = $( '#menu-item-user' ).length === 1

	// Reverse of the above, to help us write cleaner conditionals
	var isLoggedOut = ! isLoggedIn

	// We'll use this for further comparisons
	var currentUrl = getCurrentUrl()

	// Test if we're on the support portal homepage
	var isHomePage = 'tribe.ladesk.com' === currentUrl

	// Test if we're on the login page
	var isLoginPage = currentUrl.match( /login/ ) !== null

	// Test if we're on the My Tickets page
	var isMyTicketsPage = currentUrl.match( /my_tickets/ ) !== null

	// Test if we're on the Submit Ticket page
	var isSubmitTicketPage = currentUrl.match( /submit_ticket/ ) !== null
	
	var navbarClass = $( '.navbar' )
	var jumbotron = $( '.jumbotron' )
	var marginTop = $( '.margin-top' )
	var marketingClass = $( '#tribe-marketing-alert' )
	var featuredClass = $( '.featured-content' )
	var portalsClass = $( '.portals' )
	var footerClass = $( 'footer' ).addClass( 'footer' )

	/**
	 * Return the page URL, but with any trailing slashes and the protocol 
	 * ("http://" or "https://") stripped for safer comparisons.
	 */
	function getCurrentUrl() {
		var url = document.location.toString()
		var protocolSeparator = url.match( /:\/\// )

		// Remove trailing slash for uniformity
		if ( '/' === url.slice( -1 ) ) {
			url = url.slice( 0, -1 )
		}

		// Remove the protocol
		if ( protocolSeparator !== null ) {
			url = url.slice( protocolSeparator.index + 3 )
		}

		return url;
	}

	function addMarketingAlert( message ) {
		// Add the actual message
		navbarClass.after( message )
	}

	function addComponentFeaturedContent( content ) {
		if ( isHomePage === true ) {
			jumbotron.after( content )
		}
	}

	function addComponentPortals( content ) {
		if ( isHomePage === true ) {
			marginTop.after( content )
		}
	}

	function addComponentInterstitial( content ) {
		if ( isHomePage === true ) {
			footerClass.before( content )
		}
	}

	function addJumbotronMessage( message ) {
		$jumbotronHeading.after( message )
	}

	function optionallyRemovePresalesForm() {
		// If the user is not logged in or else if the presales form can't be located
		// we should not interfere
		if ( ! isLoggedIn || $presalesForm.length !== 1 ) {
			return
		}

		$presalesForm.hide()
	}

	addMarketingAlert( marketingAlert )
	addComponentFeaturedContent( componentFeaturedContent )
	addComponentPortals( componentPortals )
	addComponentInterstitial( componentInterstitial )

	document.body.dispatchEvent( new Event( 'tribe-liveagent.ready' ) );
} )

/*
	*	Gists oEmbed
	* author: Blair Vanderhoof
	* https://github.com/blairvanderhoof/gist-embed
	* version 2.6.0
*/

(function($) {
	'use strict';

	function getLineNumbers(lineRangeString) {
		var lineNumbers = [], range, lineNumberSections;

		if (typeof lineRangeString === 'number') {
			lineNumbers.push(lineRangeString);
		} else {
			lineNumberSections = lineRangeString.split(',');

			for (var i = 0; i < lineNumberSections.length; i++) {
				range = lineNumberSections[i].split('-');
				if (range.length === 2) {
					for (var j = parseInt(range[0], 10); j <= range[1]; j++) {
						lineNumbers.push(j);
					}
				} else if (range.length === 1) {
					lineNumbers.push(parseInt(range[0], 10));
				}
			}
		}
		return lineNumbers;
	}

	//object to cache the calls made to the same gist-id
	var gistCache = {};

	$.fn.gist = function(callback) {
		return this.each(function() {
			var $elem = $(this),
				id,
				url,
				file,
				caption,
				lines,
				linesExpanded,
				loading,
				highlightLines,
				hideFooterOption,
				hideLineNumbersOption,
				showLoading,
				showSpinner,
				enableCache,
				data = {};

			// make block level so loading text shows properly
			$elem.css('display', 'block');

			id = $elem.data('gist-id') || '';
			file = $elem.data('gist-file');
			caption = $elem.data('gist-caption');
			hideFooterOption = $elem.data('gist-hide-footer') === true;
			hideLineNumbersOption = $elem.data('gist-hide-line-numbers') === true;
			lines = $elem.data('gist-line');
			linesExpanded = $elem.data('gist-lines-expanded');
			highlightLines = $elem.data('gist-highlight-line');
			showSpinner = $elem.data('gist-show-spinner') === true;
			if (showSpinner) {
				showLoading = false;
			} else {
				showLoading = $elem.data('gist-show-loading') !== undefined ?
					$elem.data('gist-show-loading') : true;
			}

			if (file) {
				data.file = file;
			}

			// if the id doesn't exist, then ignore the code block
			if (!id) {
				return false;
			}

			url = 'https://gist.github.com/' + id + '.json';
			enableCache = $elem.data('gist-enable-cache') === true || gistCache[url];
			loading = 'Loading gist ' + url + (data.file ? ', file: ' + data.file : '') + '...';

			// loading
			if (showLoading) {
				$elem.html(loading);
			}

			// loading spinner
			if (showSpinner) {
				$elem.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="' + loading + '" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">');
			}

			function successCallback(response) {
				var linkTag,
						head,
						lineNumbers,
						highlightLineNumbers,
						$responseDiv;

				// the html payload is in the div property
				if (response && response.div) {
					// github returns /assets/embed-id.css now, but let's be sure about that
					if (response.stylesheet) {
						// github passes down html instead of a url for the stylehsheet now
						// parse off the href
						if (response.stylesheet.indexOf('<link') === 0) {
							response.stylesheet =
								response.stylesheet
								.replace(/\\/g, '')
								.match(/href=\"([^\s]*)\"/)[1];
						} else if (response.stylesheet.indexOf('http') !== 0) {
							// add leading slash if missing
							if (response.stylesheet.indexOf('/') !== 0) {
								response.stylesheet = '/' + response.stylesheet;
							}
							response.stylesheet = 'https://gist.github.com' + response.stylesheet;
						}
					}

					// add the stylesheet if it does not exist
					if (response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0) {
						linkTag = document.createElement('link');
						head = document.getElementsByTagName('head')[0];

						linkTag.type = 'text/css';
						linkTag.rel = 'stylesheet';
						linkTag.href = response.stylesheet;
						head.insertBefore(linkTag, head.firstChild);
					}

					// refernce to div
					$responseDiv = $(response.div);

					// remove id for uniqueness constraints
					$responseDiv.removeAttr('id');

					$elem.html('').append($responseDiv);

					// option to highlight lines
					if (highlightLines) {
						highlightLineNumbers = getLineNumbers(highlightLines);

						// we need to set the line-data td to 100% so the highlight expands the whole line
						$responseDiv.find('td.line-data').css({
							'width': '100%'
						});

						// find all .js-file-line tds (actual code lines) that match the highlightLines and add the highlight class
						$responseDiv.find('.js-file-line').each(function(index) {
							if ($.inArray(index + 1, highlightLineNumbers) !== -1) {
								$(this).css({
									'background-color': 'rgb(255, 255, 204)'
								});
							}
						});
					}

					// if user provided a line param, get the line numbers based on the criteria
					if (lines) {
						lineNumbers = getLineNumbers(lines);

						var collapsableLineNumbers = [];

						// find all trs containing code lines that don't exist in the line param
						$responseDiv.find('.js-file-line').each(function(index) {
							if (($.inArray(index + 1, lineNumbers)) === -1) {
								if (linesExpanded) {
									collapsableLineNumbers.push(index + 1);
									$(this).parent().hide();
								} else {
									$(this).parent().remove();
								}
							}
						});

						// option to expand highlight lines and collapse hidden lines
						if (linesExpanded) {
							var collapsableBlocks = chunkBy(collapsableLineNumbers, function(line) {
								return !collapsableLineNumbers.includes(line - 1);
							});

							$.each(collapsableBlocks, function(index, block) {
								var firstLine = block[0];
								var lineBeforeFirstLine = firstLine - 1;
								var lastLine = block[block.length - 1];

								var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 44" style="height: 15px; position: relative; top: 2px;"><path fill="#bbb" fill-rule="evenodd" d="M8.0066 16.05305v-7.6523c0-.82422-.47656-1.0273-1.0586-.4414l-3.5117 3.5039c-1.8789 1.875-4.6953-.94142-2.8164-2.8164L8.7215.61564c.68359-.67579 1.8008-.6797 2.4922 0l8.1641 8.0312c1.8789 1.875-.9375 4.6914-2.8164 2.8164l-3.5078-3.5039c-.58984-.58985-1.0625-.38673-1.0625.4414v27.30827c0 .82031.47656 1.0273 1.0586.44141l3.5117-3.5039c1.8789-1.875 4.6953.9375 2.8164 2.8164l-8.1016 8.0273c-.6836.6797-1.8008.6797-2.4922 0l-8.1641-8.0273c-1.8789-1.8789.9375-4.6914 2.8164-2.8164l3.5078 3.5039c.58984.58984 1.0625.38672 1.0625-.4414V16.05304z"/></svg>';
								var collapsibleIcon = $('<a></<a>');
								collapsibleIcon.attr('lines', block.join())
									.css({
										'display': 'block',
										'cursor': 'pointer'
									})
									.html(svg)
									.on('click', function(event) {
										event.preventDefault();
										$(this).closest('tr').remove();
										var that = $(this);
										$('table.highlight').find('tr:hidden td[data-line-number]').each(function(index, element) {
											lines = that.attr('lines').split(',');

											if (($.inArray($(element).attr('data-line-number'), lines)) === -1) {
												return true;
											}

											$(element).parent().show();
										});
									});

								var lineNumberElement = $('<td></td>')
									.addClass('blob-num js-line-number collapsed')
									.attr('style', 'background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; text-align: center; padding-top: 5px !important; padding-bottom: 5px !important;')
									.append(collapsibleIcon);

								var lineCodeElement = $('<td></td>')
									.addClass('blob-code blob-code-inner js-file-line collapsed')
									.attr('style', 'background-color: #f9f9f9; color: #999; font-size: 12px; font-style: italic; padding-top: 5px !important; padding-bottom: 5px !important;')
									.html('... Lines ' + firstLine + ' - ' + lastLine);

								var lineElement = $('<tr></tr>')
									.append(lineNumberElement)
									.append(lineCodeElement);

								$responseDiv.find('.js-line-number[data-line-number=' + lineBeforeFirstLine + ']').parent().after(lineElement);
							});
						}
					}

					// option to show caption
					if (caption) {
						var tbody = $responseDiv.find('table tbody');
						var row = $('<tr></tr>');
						var captionColumn = $('<td></td>')
							.attr('style', 'padding: 10px !important; border-bottom: 10px solid white; background-color: #f9f9f9; font-weight: bold;')
							.html(caption);

						row.append($('<td style="background-color: #f9f9f9; border-bottom: 10px solid white;"></td>'));
						row.append(captionColumn);
						tbody.prepend(row);
					}

					// option to remove footer
					if (hideFooterOption) {
						$responseDiv.find('.gist-meta').remove();

						// present a uniformed border when footer is hidden
						$responseDiv.find('.gist-data').css('border-bottom', '0px');
						$responseDiv.find('.gist-file').css('border-bottom', '1px solid #ddd');
					}

					// option to remove
					if (hideLineNumbersOption) {
						$responseDiv.find('.js-line-number').remove();
					}
				} else {
					$elem.html('Failed loading gist ' + url);
				}
			}

			function errorCallBack(textStatus) {
				$elem.html('Failed loading gist ' + url + ': ' + textStatus);
			}

			function completeCallBack() {
				if (typeof callback === 'function') {
					callback();
				}
			}

			function chunkBy(items, predicate) {
				if (items.length === 0) {
					return []
				}

				return items.slice(1).reduce(function(chunked, item) {
					if (predicate(item)) {
						chunked.push([item])
					} else {
						chunked.push(chunked.pop().concat([item]))
					}

					return chunked
				}, [items.slice(0, 1)])
			}

			// request the json version of this gist
			$.ajax({
				url: url,
				data: data,
				dataType: 'jsonp',
				timeout: 20000,
				beforeSend: function() {
					// option to enable cacheing of the gists
					if (enableCache) {
						if (gistCache[url]) {
							// loading the response from cache and preventing the ajax call
							gistCache[url].then(function(response) {
								successCallback(response);
								completeCallBack();
							}, function(errorStatus) {
								errorCallBack(errorStatus);
							});
							return false;
						} else {
							// saving the promise for the requested json as a proxy for the actuall response
							gistCache[url] = $.Deferred();
						}
					}
				},
				success: function(response) {
					if (enableCache) {
						if (gistCache[url]) {
							gistCache[url].resolve(response);
						}
					}
					successCallback(response);
				},
				error: function(jqXHR, textStatus) {
					errorCallBack(textStatus);
				},
				complete: function() {
					completeCallBack();
				}
			});

		});
	};

	$(function() {
		// find all elements containing "data-gist-id" attribute.
		$('[data-gist-id]').gist();
	});

})(jQuery);
} )()