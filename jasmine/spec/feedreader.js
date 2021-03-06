/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('have a URL defined', function() {
            allFeeds.forEach(function(index){
                expect(index.url).toBeDefined();
                expect(index.url.length).not.toBe(0);
            });

        });

        /* The test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
       
        it('have a name defined', function(){
            allFeeds.forEach(function(index){
                expect(index.name).toBeDefined();
                expect(index.name.length).not.toBe(0);
            });

        });
    });


    describe('The menu', function(){
                
      /* This test that ensures the menu element is
          hidden by default. */
        
     //Utilized concepts from Matthew Cranford's Feedreader Walkthrough   
        it('is hidden by default', function(){
            const bodyClass = document.querySelector('body');
                expect(bodyClass.classList.contains('menu-hidden')).toBe(true);
        });
    

        /* This test will ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations where the menu displays when
          * clicked and the menu is hidden when clicked again.
          */
         it('changes visibility when menu icon is clicked', function(){
            const navMenu = document.querySelector('.menu-icon-link');
            const bodyClass = document.querySelector('body');

            navMenu.click() 
            expect(bodyClass.classList.contains('menu-hidden')).toBe(false);//Does the menu display when clicked?
            navMenu.click()
            expect(bodyClass.classList.contains('menu-hidden')).toBe(true);//Does the menu hide when clicked again?

        });

    });    
    
    describe('Initial Entries', function(){

        beforeEach(function(done){

            loadFeed(1, done);          
        });

        
        /* This test ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        //Utilized concepts from Ryan Waite's "Feedreader Testing Walkthrough"
        it('when loadFeed is called and completes work', function(){
            const feedClass = document.querySelector('.feed .entry');
            expect(feedClass.children.length).toBeGreaterThan(0);
        });

    });
    
    describe('New Feed Selection', function(){
        let feedOne, feedTwo;

        beforeEach(function(done){

            loadFeed(0, function(){
                feedOne = document.querySelector('div.feed').innerHTML;

                loadFeed(1, function(){
                    feedTwo = document.querySelector('div.feed').innerHTML;

                    done()
                });
            });                       
        });
        
        
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        
        it('content actually changes', function(){
            expect(feedOne).not.toBe(feedTwo);
            
        });
    });    
}());


// References include:https://matthewcranford.com/category/blog-posts/walkthrough/feed-reader/,  FEND Project 4 Feed Reader Testing - Walk Through with Ryan Waite at https://www.youtube.com/watch?v=eUdkhVkpCf8
