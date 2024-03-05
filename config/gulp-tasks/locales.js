import gulp from "gulp";
import changed from "gulp-changed"; // визначає чи змінилися файли в потоці
import plumber from "gulp-plumber"; // запобігайте розриву каналу через помилки плагінів gulp
import { plumberNotify } from "../gulp-plugins.js";
import environments from "gulp-environments";
const { development, production } = environments;

const SOURCE = "./src/locales/**/*.json";
let destination = development() ? "dev/locales" : "dist/locales";

function locales() {
    return gulp
        .src(SOURCE)
        .pipe(changed(destination))
        .pipe(plumber(plumberNotify("LANG")))
        .pipe(gulp.dest(destination));
}

export { locales };
