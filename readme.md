# Installations

- install Node.js [Node.js](https://nodejs.org/en/)
-  Extract ruby and its dev kit [Ruby](https://rubyinstaller.org/).
    - You can find the [complete guide for windows here](https://forwardhq.com/help/installing-ruby-windows)
- Install ruby gem compass [Compass](https://rubygems.org/search?utf8=%E2%9C%93&query=compass)
    - **Command => gem install compass**
- Now install dependencies and package wit this command
    - **Command => npm install**
- If you want to use [Bower](https://bower.io/) as package manager, Run these two commands in the project folder to setup bower.
    - **Command=> npm install -g bower**
    - **Command=> bower init and save with default**
- Now to install any bower package run this commmand
    - **Command=> bower install <packagename> -S**


# Directory Structure

- All of your working files will be in source folder and it will output the file in build folder
- Add all the font file in source->fonts
- Add all the image files in source->images and the image which you want to convert to data-uri to avoid http calls, add them into source->images->inline
- Add all the js file in source->js for libraries use lib folder
- Add all the .scss file in source->sass
- Add all the html partials file in source->template


# Gulp Packages

- **[gulp](https://www.npmjs.com/package/gulp):** The streaming build system
- **[bower](https://www.npmjs.com/package/bower):** The browser package manager
- **[del](https://www.npmjs.com/package/del):** Delete files and folders
- **[browser-sync](https://www.npmjs.com/package/browser-sync):** Live CSS Reload & Browser Syncing
- **[gulp-nunjucks](https://www.npmjs.com/package/gulp-nunjucks):** HTML templating engine
- **[gulp-sass](https://www.npmjs.com/package/gulp-sass):** Gulp plugin for sass
- **[gulp-pleeease](https://www.npmjs.com/package/gulp-pleeease):** To add vendor prefixes automatically
- **[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin):** Minify PNG, JPEG, GIF and SVG images
- **[gulp-newer](https://www.npmjs.com/package/gulp-newer):** Only pass through newer source files
- **[gulp-imacss](https://www.npmjs.com/package/gulp-imacss):** A gulp plugin for using imacss (the image to datauri to CSS transformer) to avoid http calls
- **[gulp-jshint](https://www.npmjs.com/package/gulp-jshint):** JSHint plugin for gulp To log js error in console
- **[gulp-concat](https://www.npmjs.com/package/gulp-concat):** Concatenates files
- **[gulp-strip-debug](https://www.npmjs.com/package/gulp-strip-debug):** Strip console and debugger statements from JavaScript code
- **[gulp-uglify](https://www.npmjs.com/package/gulp-uglify):** Minify files with UglifyJS.


# Load components from bower

- To load any js file from bower_components add the path of js file in array scripits.in array in gulpfile.js file (find this: //add path of any bower component here)
- To load and sass file in css file add the path of sass file at in you main scss file in sass folder


# Gulp Tasks

- **watch:** Runs all the tasks automatically and waits for any change
- **cleanBuild:** Cleans the build folder
- **browsersync:** For reload and mobile testing
- **html:** To merge the html partials and output the complete html files
- **sass:** Complies sass to css
- **images:** Minimizes, copies new images into build folder
- **imageuri:** Change inline images to data uri
- **fonts:** Copies new font files to build folder
- **scripts:** Copies and debugs the script files