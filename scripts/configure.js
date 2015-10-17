// Copyright © 2015 Bob W. Hogg. All Rights Reserved.
// 
// This file is part of jsduck-from-js.
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
/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
var path = require("path");
var childProcess = require("child_process");
var which = require("which").sync;

console.log("Configuring JSDuck");

const INSTALL_JSDUCK_MESSAGE = "Please manually install JSDuck.";

// JSDuck gem
const GEM_NAME = "jsduck";

// try to find the executable and automatically install it if not found
try
{
    var duck = which(GEM_NAME);
}
catch(e)
{
    console.log("Could not find jsduck");
    try
    {
        var gem = which("gem");
    }
    catch(f)
    {
        console.log("Could not find gem executable");
        console.log(INSTALL_JSDUCK_MESSAGE);
        process.exit(1);
    }
    var gemProcess = childProcess.spawnSync(gem, ["install", GEM_NAME, "--user-install"]);
    if(gemProcess.error)
    {
        console.log("Installation process failed");
        console.log(INSTALL_JSDUCK_MESSAGE);
        throw gemProcess.error;
    }
    else
    {
        console.log(gemProcess.status);
        console.log(gemProcess.stdout.toString());
        console.log(gemProcess.stderr.toString());
    }
}
