resume-builder
==============

This project started as a way to learn [Grunt](http://gruntjs.com/) from the ground up.

The purpose is to maintain a single YAML file,
[resume.yml](https://github.com/kmcgrath/resume-builder/blob/master/resume.yml), and be
able to convert that file into a variety of usable outputs, including JSON, Markdown,
HTML, PDF and a small JavaScript based web application that implements
[Backbone.Marionette](http://marionettejs.com/) and [Foundation 5](http://foundation.zurb.com/).

The output of this builder is stored in it's own [repository](https://github.com/kmcgrath/resume)
and the JavaScript application can be viewed at [https://kmcgrath.github.io/resume](https://kmcgrath.github.io/resume/).

## Build It

1. Fork the repo
2. Update resume.yml
3. run: grunt dist

The dist directory will contain all the outputs mentioned above.


## TODO
* Make resume-builder an executable that takes a YAML file as input

