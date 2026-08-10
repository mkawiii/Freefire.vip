/* ==========================================================================
   AdBlueMedia Custom Content Locker JavaScript - Free Fire Redesign
   Copy and paste this JS code into:
   AdBlueMedia Dashboard -> Design Your Content Locker -> Custom CSS & JavaScript -> JavaScript
   ========================================================================== */

// --- Editable Settings ---
// High Quality Free Fire Diamond Badge Image
var headerImage = 'https://cdn-icons-png.flaticon.com/512/616/616490.png'; 
var showDifficulties = false; // Set to true to show Easy/Medium/Hard badges on offers

// --- Core Locker Script Engine ---
$(document).ready(function() {
    // Clean up old header elements
    $('#inserted-header').remove();
    
    // Inject Custom Header Image & Free Fire Title HTML
    $('#my-locker-top span').html(
        '<div style="margin-bottom: 10px;">' +
            '<img src="' + headerImage + '" style="height: 85px; filter: drop-shadow(0 0 15px rgba(255, 184, 0, 0.6));" />' + 
        '</div>' +
        '<span style="display: block; font-family: \'Cairo\', sans-serif; font-size: 21px; font-weight: 800; color: #FFFFFF;">' + 
            useLockerSettings['text']['header'] + 
        '</span>' +
        '<hr />'
    );
              
    // Inject Red Captcha Status Button with Spinning Icon
    $('.my-locker-body-text-bottom').html(
        '<div class="loading-button">' +
            '<i class="fa fa-spin fa-spinner" style="color: #FFDF00; margin-left: 8px;"></i>' +
            ' - ' + useLockerSettings['text']['body-bottom'] + 
        '</div>'
    );
              
    var mainColor = '#FF3B30'; // Free Fire Red Theme Color
              
    $('#super-custom-css').remove();
    $('body').append(
        '<style id="super-custom-css">' +
            '#my-locker { border-color: ' + mainColor + ' !important; }' +
            '.loading-button { background: linear-gradient(135deg, #D9383A 0%, #A81C1E 100%) !important; color: #FFFFFF !important; }' +
        '</style>'
    );
                
    $('.number-of-offers').text(useLockerSettings['offers']['min-offers']);
    
    var difficulties = ['Easy', 'Easy', 'Medium', 'Hard'];
    var difficultyCount = 0;

    $('#my-locker-body-offers-list a').each(function() {
        var difficulty = difficulties[difficultyCount] || 'Hard';

        $('.difficulty', this).remove();
        
        if (showDifficulties === true) {
            $('> span', this).append('<div class="difficulty ' + difficulty.toLowerCase() + '">' + difficulty + '</div>');
        }
        
        difficultyCount++;
    });
});
