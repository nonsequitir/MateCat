
if ( SegmentFilter.enabled() )
(function($, UI, SF, undefined) {

    var original_getSegmentsMarkup = UI.getSegmentMarkup ;
    var original_editAreaClick     = UI.editAreaClick ;

    var original_selectorForNextUntranslatedSegment = UI.selectorForNextUntranslatedSegment ; 
    var original_selectorForNextSegment = UI.selectorForNextSegment ; 
    var original_gotoNextSegment = UI.gotoNextSegment ;
    var original_gotoPreviousSegment = UI.gotoPreviousSegment ;

    var gotoPreviousSegment = function() {
        var list = SegmentFilter.lastFilterData['segment_ids'] ;
        var index = list.indexOf('' + UI.currentSegmentId);
        var nextFiltered = list[ index - 1 ];

        if ( nextFiltered && UI.Segment.findEl( nextFiltered ).length ) {
            original_gotoPreviousSegment.apply(undefined, arguments);
        } else if ( nextFiltered ) {
            UI.render({ firstLoad: false, segmentToOpen: nextFiltered });
        } else {
            original_gotoPreviousSegment.apply(undefined, arguments);
        }
    };

    var gotoNextSegment = function() {
        var list = SegmentFilter.lastFilterData['segment_ids'] ;
        var index = list.indexOf('' + UI.currentSegmentId);
        var nextFiltered = list[ index + 1 ];

        if ( nextFiltered && UI.Segment.findEl( nextFiltered ).length ) {
            original_gotoNextSegment.apply(undefined, arguments);
        } else if ( nextFiltered ) {
            UI.render({ firstLoad: false, segmentToOpen: nextFiltered });
        } else {
            original_gotoNextSegment.apply(undefined, arguments);
        }
    };

    $.extend(UI, {
        gotoPreviousSegment : function() {
            if ( SF.filtering() ) {
                gotoPreviousSegment.apply(undefined, arguments);
            } else {
                original_gotoPreviousSegment.apply(undefined, arguments);
            }

        },

        gotoNextSegment : function() {
            if ( SF.filtering() ) {
                gotoNextSegment.apply(undefined, arguments);
            } else {
                original_gotoNextSegment.apply(undefined, arguments);
            }

        },
        selectorForNextUntranslatedSegment : function(status, section) {
            if ( !SF.filtering() ) {
                return original_selectorForNextUntranslatedSegment(status, section); 
            } else {
                return 'section:not(.muted)';
            }
        },

        selectorForNextSegment : function() {
            if ( !SF.filtering() ) {
                return original_selectorForNextSegment(); 
            } else  {
                return 'section:not(.muted)'; 
            }
        },

        isMuted : function(el) {
            return  $(el).closest('section').hasClass('muted');
        },

        editAreaClick : function(e, operation, action) {
            var e = arguments[0];
            if ( ! UI.isMuted(e.target) ) {
                original_editAreaClick.apply( e.target, arguments );
            }
        },

        getSegmentMarkup : function() {
            var markup = original_getSegmentsMarkup.apply( undefined, arguments );
            var segment = arguments[0];

            if (SF.filtering()) {
                if ( SF.lastFilterData['segment_ids'].indexOf( segment.sid ) === -1 ) {
                    markup = $(markup).addClass('muted');
                    markup = $('<div/>').append(markup).html();
                }
            }

            return markup ;
        }
    });
})(jQuery, UI, SegmentFilter);
