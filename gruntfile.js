module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: {
            html: ['app/*.html', 'app/templates/*.html'],
            css: 'app/styles/*.css',
            js: 'app/src/**/*.js'
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },
        clean: {
            tmp: {
                src: ['tmp']
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= app.js %>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    base: 'app'
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/src/**/*.js']
        },
        watch: {
            files: ['<%= jshint.files %>', '<%= app.html %>', '<%= app.css %>'],
            tasks: ['wiredep', 'jshint', 'karma:unit', 'concat:dist', 'clean:tmp'],
            options: {
                livereload: true
            }
        },
        wiredep: {
            target: {
                src: 'app/index.html'
        }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', [
        'bower',
        'jshint',
        'karma:unit'
    ]);

    grunt.registerTask('serve', [
        'bower',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'bower',
        'wiredep',
        'jshint',
        'karma:unit',
        'concat:dist',
        'uglify',
        'clean:tmp'
    ]);

};
