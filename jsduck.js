// Copyright © 2015 - 2016 Bob W. Hogg. All rights reserved.
//
// This file is part of jsduck.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var Class = require("yajscf");
var which = require("which").sync;
var spawnSync = require("spawn-sync");
var _ = require("underscore");

/**
 * @class JSDuck
 * JSDuck is a JavaScript wrapper for [jsduck](https://github.com/senchalabs/jsduck)
 * It supports all the options the command-line version does
 */
module.exports = Class.extend(
{
    /**
     * @method constructor
     * Constructor.
     * @param {String[]} options Array of options to pass to the JSDuck gem
     * @param {String} [path] Path to the jsduck executable. If not passed, uses `which` to find it.
     * @throws
     * If we cannot find the jsduck binary
     */
    init: function(options, path)
    {
        /**
         * @property {String[]} options
         * Options for the jsduck gem
         * @private
         */
        this.options = options;

        if(path)
        {
            /**
             * @property {String} binary
             * Path to the jsduck gem
             * @private
             */
            this.binary = path;
        }
        else
        {
            // confirm jsduck exists
            this.binary = which("jsduck");
        }
    },

    /**
     * doc generates the documentation according to the specified options
     * @param {String[]} paths The list of paths to generate documentation for
     * @return {Object}
     * The result of the documentation request
     */
    doc: function(paths)
    {
        var result = spawnSync(this.binary, _.union(this.options, paths));
        if(result.error)
        {
            throw result.error;
        }
        return result;
    }
});
