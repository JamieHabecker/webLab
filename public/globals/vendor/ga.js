
    var _gaq = _gaq || [];
    var testKey = 'qeTest', storage = window.sessionStorage;
  _gaq.push(['_setAccount', 'UA-38638778-1']);
  _gaq.push(['_trackPageview']);
    (function() {
    var s, ga = document.createElement('script'); 
    ga.type = 'text/javascript'; 
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
    
    try {
        // Try and catch quota exceeded errors
        storage.setItem(testKey, '1');
        storage.removeItem(testKey);
    } catch (error) {
        if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0)
            alert('Please make sure you have private browsing turned off in your Safari settings to use this form.');
        else
            throw error;
    };