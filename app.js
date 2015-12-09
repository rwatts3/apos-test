/* jshint node:true */
var fs = require('fs');

var site = require('apostrophe-site')();

site.init({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'Sandbox',
  hostName: 'sandbox',
  title: 'Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',
  // Set the port for deployment purposes.
  // This is overwritten in local.js
  port:4005 ,
  db: {
    uri: 'mongodb://localhost:27017/sandbox'
  },

  // Force a2 to prefix all of its URLs. It still
  // listens on its own port, but you can configure
  // your reverse proxy to send it traffic only
  // for URLs with this prefix. With this option
  // "/" becomes a 404, which is supposed to happen!

  // prefix: '/test',

  // If true, new tags can only be added by admins accessing
  // the tag editor modal via the admin bar. Sometimes useful
  // if your folksonomy has gotten completely out of hand
  lockTags: false,
  
  // Let's minify the site for Live & Staging.
  minify: true,

  // Give users a chance to log in if they attempt to visit a page
  // which requires login
  secondChanceLogin: true,

  locals:  require('./lib/locals.js'),

  // you can define lockups for areas here
  // lockups: {},

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default Page' },
      { name: 'home', label: 'Home Page' },
      { name: 'blog', label: 'Blog' }
    ]
  },

  lockups: {
    left: {
      label: 'Left',
      tooltip: 'Inset Left',
      icon: 'icon-arrow-left',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    },
    right: {
      label: 'Right',
      tooltip: 'Inset Right',
      icon: 'icon-arrow-right',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    }
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-editor-2': {},
    'apostrophe-ui-2': {},
	'apostrophe-snippets': {
		'enableExport': true
	},
    'apostrophe-blog-2': {
	 'enableExport': true,
      perPage: 5,
      pieces: {
        addFields: [
          {
            name: '_author',
            type: 'joinByOne',
            withType: 'person',
            idField: 'authorId',
            label: 'Author'
          }
        ]
      }
    },
    'apostrophe-people': {
      addFields: [
        {
          name: '_blogPosts',
          type: 'joinByOneReverse',
          withType: 'blogPost',
          idField: 'authorId',
          label: 'Author',
          withJoins: [ '_editor' ]
        },
        {
          name: 'thumbnail',
          type: 'singleton',
          widgetType: 'slideshow',
          label: 'Picture',
          options: {
            aspectRatio: [100,100]
          }
        }
      ]
    },
    'apostrophe-groups': {},
    'apostrophe-browserify': {
      files: ["./public/js/modules/_site.js"]
    }
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['site'],
    scripts: ['_site-compiled']
  },

  // afterInit: function(callback) {
  // // Put Code to run afterInit
  //   callback(null);
  // }

});
