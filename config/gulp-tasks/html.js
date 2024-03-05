import gulp from "gulp";
// import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import { plumberNotify } from "./../gulp-plugins.js";
import fileInclude from "gulp-file-include";
import webpHTML from "gulp-webp-html";
import htmlmin from "gulp-htmlmin";
import environments from "gulp-environments";

const fileIncludeSettings = {
    prefix: "@@",
    basepath: "@file",
};

const { development, production } = environments;

const SOURCE = ["src/html/index.html"];
let destination = development() ? "./dev" : "./dist";

function html() {
    return (
        gulp
            .src(SOURCE)
            // .pipe(changed(destination)) // !!! ламає роботу fileInclude
            .pipe(plumber(plumberNotify("HTML")))
            .pipe(webpHTML())
            .pipe(
                production(
                    htmlmin({
                        collapseWhitespace: true,
                        removeComments: true,
                    }),
                ),
            )
            .pipe(fileInclude(fileIncludeSettings))
            .pipe(gulp.dest(destination))
    );
}

export { html };
