var gulp = require("gulp"),
    logs = require("fancy-log"),
    browserify=require("gulp-browserify"),
    compass=require("gulp-compass"),
    uglify=require("gulp-uglify"),
    gulpif=require("gulp-if"),
    minifyHtml=require("gulp-minify-html"),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-clean-css'),
    jsonMinify=require("gulp-jsonminify"),
    concat=require("gulp-concat");

var env,
    jsSources,
    outputDir,
    sassStyle,
    htmlSources,
    cssSources,
    sassSources;

env= process.env.NODE_ENV || "development";
if(env==="development"){
outputDir="builds/development/";
sassStyle="expanded";
}else{
outputDir="builds/production/";
sassStyle="compact";
}
htmlSources=["builds/development/*.html"];
sassSources=["css/style.css"];
cssSources=["builds/development/css/style.css"];
 //["components/sass/style.scss"];

gulp.task("compass", function(){
gulp.src(sassSources)
    .pipe(compass({
        css:outputDir+"css",
    sass:"components/sass",
    image:"images",
    style:sassStyle
    }))
    logs(sassStyle);
});

gulp.task("html",function(){
    gulp.src(htmlSources)
        .pipe(gulpif(env==="production", minifyHtml()))
        .pipe(gulpif(env==="production",gulp.dest(outputDir)))
})
gulp.task("css",function(){
    gulp.src(cssSources)
        .pipe(concatCss("css/style.mini.css"))
        .pipe(gulpif(env==="production", minifyCss()))
        .pipe(gulp.dest(outputDir))
})

gulp.task("watch",function(){
    // gulp.watch(jsSources,["js"])
    gulp.watch("builds/development/css/*.css",["css"])
    gulp.watch("components/sass/*.scss",["compass"])
    gulp.watch(htmlSources,["html"])
    // gulp.watch("builds/development/js/*.json",["json"])
})
gulp.task("default",[ "html", "css", "watch"]);
