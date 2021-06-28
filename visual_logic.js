/**
 * Generated by Verge3D Puzzles v.3.7.1
 * Mon Jun 28 2021 14:49:50 GMT+0800 (中国标准时间)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

'use strict';

(function() {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();

var PL = v3d.PL = v3d.PL || {};

// a more readable alias for PL (stands for "Puzzle Logic")
v3d.puzzles = PL;

PL.procedures = PL.procedures || {};




PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    var PROC = {
    
};

// initSettings puzzle
_initGlob.output.initOptions.fadeAnnotations = true;
_initGlob.output.initOptions.useBkgTransp = false;
_initGlob.output.initOptions.preserveDrawBuf = false;
_initGlob.output.initOptions.useCompAssets = true;
_initGlob.output.initOptions.useFullscreen = false;

    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}



var PROC = {
    
};

var wood_icon, ground_icon, markers_visible;


// createCSSRule puzzle
function createCSSRule(cssRule, cssRuleCont, isParent) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssRule + ' { ' + cssRuleCont + ' } ';

    var styles = (isParent) ? parent.document.getElementsByTagName('head')[0] :
                              document.getElementsByTagName('head')[0];
    styles.appendChild(style)
}



// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// addHTMLElement puzzle
function addHTMLElement(elemType, id, mode, targetId, isParent) {

    var win = isParent ? window.parent : window;

    var elem = win.document.createElement(elemType);
    if (id !== '')
        elem.id = id;

    var targetElem = getElement(targetId, isParent);
    if (targetElem instanceof win.Element) {
        switch (mode) {
            case 'TO':
                targetElem.appendChild(elem);
                break;
            case 'BEFORE':
                targetElem.insertAdjacentElement('beforebegin', elem);
                break;
            case 'AFTER':
                targetElem.insertAdjacentElement('afterend', elem);
                break;
        }
    }
}



// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if (attr === 'style') {
            // NOTE: setting an attribute 'style' instead of a property 'style'
            // fixes IE11 worng behavior
            elem.setAttribute(attr, value);
        } else {
            elem[attr] = value;
        }
    }
}




// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            if (runTime) {
                _pGlob.objCache[objName] = objFound;
            }
        }
    });
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}




// bindHTMLObject puzzle
function bindHTMLObject(objName, id, isParent) {
    if (!objName)
        return;
    var elem = getElement(id, isParent);
    if (!elem)
        return;
    var obj = getObjectByName(objName);
    if (!obj)
        return;
    var projected = new v3d.Vector3();
    elem.style.top = 0;
    elem.style.left = 0;
    function bindHTMLUpdateCb() {
        var camera = appInstance.getCamera(true);
        camera.updateMatrixWorld();
        obj.getWorldPosition(projected).project(camera);

        var isBehindCamera = false;
        var farNearCoeff = (camera.far + camera.near) / (camera.far - camera.near);
        if (camera.isPerspectiveCamera) {
            isBehindCamera = projected.z > farNearCoeff;
        } else if (camera.isOrthographicCamera) {
            isBehindCamera = projected.z < -farNearCoeff;
        }

        if (isBehindCamera) {
            // behind the camera, just move the element out of the sight
            projected.x = projected.y = -1e5;
        } else {
            projected.x = (0.5 + projected.x / 2) * appInstance.container.offsetWidth;
            projected.y = (0.5 - projected.y / 2) * appInstance.container.offsetHeight;
        }

        elem.style.transform = "translate(" + projected.x + "px, " + projected.y + "px)";
    }
    appInstance.renderCallbacks.push(bindHTMLUpdateCb);
    if (v3d.PL.editorRenderCallbacks)
        v3d.PL.editorRenderCallbacks.push([appInstance, bindHTMLUpdateCb]);
}



// setHTMLElemStyle puzzle
function setHTMLElemStyle(prop, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem || !elem.style)
            continue;
        elem.style[prop] = value;
    }
}



// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem.addEventListener(eventType, callback);
        if (v3d.PL.editorEventListeners)
            v3d.PL.editorEventListeners.push([elem, eventType, callback]);
    }
}



// setCSSRuleStyle puzzle
function setCSSRuleStyle(prop, value, id, isParent, mediaRule) {
    var styles = (isParent) ? parent.document.styleSheets : document.styleSheets;
    for (var i = 0; i < styles.length; i++) {
        /**
         * workaround for "DOMException: Failed to read the 'cssRules' property
         * from 'CSSStyleSheet': Cannot access rules"
         */
        try { var cssRules = styles[i].cssRules; }
        catch (e) { continue; }

        for (var j = 0; j < cssRules.length; j++) {
            var cssRule = cssRules[j];
            if (!mediaRule && cssRule.selectorText == id)
                cssRule.style[prop] = value;
            else if (mediaRule && cssRule.media && cssRule.media.mediaText == mediaRule) {
                var cssRulesMedia = cssRule.cssRules;
                for (var k = 0; k < cssRulesMedia.length; k++) {
                    if (cssRulesMedia[k].selectorText == id)
                        cssRulesMedia[k].style[prop] = value;
                }
            }
        }
    }
}



// getEventProperty puzzle
function getEventProperty(prop, event) {
    if (typeof event != "undefined") {
        switch (prop) {
            case 'target.id':
                return event.target.id;
            case 'target.value':
                return event.target.value;
            case 'touches.length':
                return event.touches ? event.touches.length : 0;
            case 'touches[0].pageX':
                return event.touches[0].pageX;
            case 'touches[0].pageY':
                return event.touches[0].pageY;
            case 'touches[1].pageX':
                return event.touches[1].pageX;
            case 'touches[1].pageY':
                return event.touches[1].pageY;
            default:
                return event[prop];
        }
    }
}



// getHTMLElemStyle puzzle
function getHTMLElemStyle(prop, id, isParent) {
    var elem = getElement(id, isParent);

    // try explicitly set style first
    if (elem && elem.style && elem.style[prop]) {
        return elem.style[prop];
    } else if (elem) {
        var win = isParent ? window.parent : window;
        return win.getComputedStyle(elem)[prop];
    } else
        return '';
}


function subsequenceFromStartFromEnd(sequence, at1, at2) {
  var start = at1;
  var end = sequence.length - 1 - at2 + 1;
  return sequence.slice(start, end);
}


/**
 * Retreive standard accessible textures for MeshNodeMaterial or MeshStandardMaterial.
 * If "collectSameNameMats" is true then all materials in the scene with the given name will
 * be used for collecting textures, otherwise will be used only the first found material (default behavior).
 */
function matGetEditableTextures(matName, collectSameNameMats) {

    var mats = [];
    if (collectSameNameMats) {
        mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
    } else {
        var firstMat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
        if (firstMat !== null) {
            mats = [firstMat];
        }
    }

    var textures = mats.reduce(function(texArray, mat) {
        var matTextures = [];
        switch (mat.type) {
            case 'MeshNodeMaterial':
                matTextures = Object.values(mat.nodeTextures);
                break;

            case 'MeshStandardMaterial':
                matTextures = [
                    mat.map, mat.lightMap, mat.aoMap, mat.emissiveMap,
                    mat.bumpMap, mat.normalMap, mat.displacementMap,
                    mat.roughnessMap, mat.metalnessMap, mat.alphaMap, mat.envMap
                ]
                break;

            default:
                console.error('matGetEditableTextures: Unknown material type ' + mat.type);
                break;
        }

        Array.prototype.push.apply(texArray, matTextures);
        return texArray;
    }, []);

    return textures.filter(function(elem) {
        // check Texture type exactly
        return elem && (elem.constructor == v3d.Texture
                || elem.constructor == v3d.DataTexture
                || elem.constructor == v3d.VideoTexture);
    });
}



/**
 * Replace accessible textures for MeshNodeMaterial or MeshStandardMaterial
 */
function matReplaceEditableTexture(mat, oldTex, newTex) {

    switch (mat.type) {
        case 'MeshNodeMaterial':
            for (var name in mat.nodeTextures) {
                if (mat.nodeTextures[name] == oldTex) {
                    mat.nodeTextures[name] = newTex;
                }
            }

            break;

        case 'MeshStandardMaterial':

            var texNames = ['map', 'lightMap', 'aoMap', 'emissiveMap',
                            'bumpMap', 'normalMap', 'displacementMap', 'roughnessMap',
                            'metalnessMap', 'alphaMap', 'envMap'];

            texNames.forEach(function(name) {
                if (mat[name] == oldTex) {
                    mat[name] = newTex;
                }
            });

            break;

        default:
            console.error('matReplaceEditableTexture: Unsupported material type ' + mat.type);
            break;
    }

    // inherit some save params
    newTex.encoding = oldTex.encoding;
    newTex.wrapS = oldTex.wrapS;
    newTex.wrapT = oldTex.wrapT;

}



// replaceTexture puzzle
function replaceTexture(matName, texName, texUrlOrElem, doCb) {

    var textures = matGetEditableTextures(matName, true).filter(function(elem) {
        return elem.name == texName;
    });

    if (!textures.length)
        return;

    if (texUrlOrElem instanceof Promise) {

        texUrlOrElem.then(function(response) {
           processImageUrl(response);
        }, function(error) {});

    } else if (typeof texUrlOrElem == 'string') {

        processImageUrl(texUrlOrElem);

    /**
     * NOTE: not checking for the MediaHTML5 constructor, because otherwise this
     * puzzle would always provide the code that's not needed most of the time
     */
    } else if (texUrlOrElem instanceof Object && texUrlOrElem.source
            instanceof HTMLVideoElement) {

        processVideo(texUrlOrElem.source);

    } else if (texUrlOrElem instanceof HTMLCanvasElement) {

        processCanvas(texUrlOrElem);

    } else {

        return;

    }

    function processImageUrl(url) {

        var isHDR = (url.search(/\.hdr$/) > 0);

        if (!isHDR) {
            var loader = new v3d.ImageLoader();
            loader.setCrossOrigin('Anonymous');
        } else {
            var loader = new v3d.FileLoader();
            loader.setResponseType('arraybuffer');
        }

        loader.load(url, function(image) {
            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            var isJPEG = url.search(/\.(jpg|jpeg)$/) > 0 || url.search(/^data\:image\/jpeg/) === 0;

            textures.forEach(function(elem) {

                if (!isHDR) {
                    elem.image = image;
                } else {
                    // parse loaded HDR buffer
                    var rgbeLoader = new v3d.RGBELoader();
                    var texData = rgbeLoader.parse(image);

                    // NOTE: reset params since the texture may be converted to float
                    elem.type = v3d.UnsignedByteType;
                    elem.encoding = v3d.RGBEEncoding;

                    elem.image = {
                        data: texData.data,
                        width: texData.width,
                        height: texData.height
                    }

                    elem.magFilter = v3d.LinearFilter;
                    elem.minFilter = v3d.LinearFilter;
                    elem.generateMipmaps = false;
                    elem.isDataTexture = true;

                }

                elem.format = isJPEG ? v3d.RGBFormat : v3d.RGBAFormat;
                elem.needsUpdate = true;

                // update world material if it is using this texture
                if (appInstance.scene !== null && appInstance.scene.worldMaterial !== null) {
                    var wMat = appInstance.scene.worldMaterial;
                    for (var texName in wMat.nodeTextures) {
                        if (wMat.nodeTextures[texName] == elem) {
                            appInstance.updateEnvironment(wMat);
                        }
                    }
                }
            });

            // exec once
            doCb();

        });
    }

    function processVideo(elem) {
        var videoTex = new v3d.VideoTexture(elem);
        videoTex.flipY = false;
        videoTex.name = texName;

        var videoAssigned = false;

        var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
        mats.forEach(function(mat) {

            textures.forEach(function(tex) {
                matReplaceEditableTexture(mat, tex, videoTex);
            });

            mat.needsUpdate = true;
            videoAssigned = true;
        });

        if (videoAssigned)
            doCb();

    }

    function processCanvas(elem) {
        var canvasTex = new v3d.CanvasTexture(elem);
        canvasTex.flipY = false;
        canvasTex.name = texName;

        var canvasAssigned = false;

        var mats = v3d.SceneUtils.getMaterialsByName(appInstance, matName);
        mats.forEach(function(mat) {

            textures.forEach(function(tex) {
                matReplaceEditableTexture(mat, tex, canvasTex);
            });

            mat.needsUpdate = true;
            canvasAssigned = true;
        });

        if (canvasAssigned) {

            if (v3d.PL) {
                v3d.PL.canvasTextures = v3d.PL.canvasTextures || {};
                v3d.PL.canvasTextures[canvasTex.image.id] = canvasTex;
            }

            doCb();
        }

    }
}
window.replaceTextureEx = function (matName, texName, texUrlOrElem, doCb){
    return replaceTexture(matName, texName, texUrlOrElem, doCb)
}


createCSSRule('.painting_palette', ('position: absolute;' + '\n' +
'display: none;' + '\n' +
'background: white;' + '\n' +
'border-radius: 25px;' + '\n' +
'width: auto;' + '\n' +
'height: auto;' + '\n' +
'z-index: 2;' + '\n' +
'padding: 2.5px;'), false);
createCSSRule('.interraction_icon', ('position: absolute;' + '\n' +
'background-size: 60%;' + '\n' +
'background-color: white;' + '\n' +
'background-position: center;' + '\n' +
'background-repeat: no-repeat;' + '\n' +
'border-radius: 25px;' + '\n' +
'width: 40px;' + '\n' +
'height: 40px;' + '\n' +
'z-index: 2;' + '\n' +
'cursor: pointer;'), false);
createCSSRule('.colors', ('position: static;' + '\n' +
'border-radius: 25px;' + '\n' +
'width: 30px;' + '\n' +
'height: 30px;' + '\n' +
'cursor: pointer;' + '\n' +
'margin: 2.5px;' + '\n' +
'float: left;'), false);
createCSSRule('.markers_hide_show', ('position: absolute;' + '\n' +
'top: 5px;' + '\n' +
'right: 60px;' + '\n' +
'width: 50px;' + '\n' +
'height: 50px;' + '\n' +
'cursor: pointer;' + '\n' +
'background-size: 100% 100%;' + '\n' +
'z-index: 3;'), false);

wood_icon = false;
addHTMLElement('div', 'material_icon', 'TO', ['CONTAINER'], false);
setHTMLElemAttribute('className', 'interraction_icon', 'material_icon', false);
bindHTMLObject('wood_icon', 'material_icon', false);
setHTMLElemStyle('left', '-20px', 'material_icon', false);
setHTMLElemStyle('top', '-20px', 'material_icon', false);
setHTMLElemStyle('backgroundImage', 'url(icons/paint-brush-solid.svg)', 'material_icon', false);
addHTMLElement('div', 'material_palette', 'TO', ['CONTAINER'], false);
setHTMLElemAttribute('className', 'painting_palette', 'material_palette', false);
bindHTMLObject('wood_icon', 'material_palette', false);
setHTMLElemStyle('left', '30px', 'material_palette', false);
setHTMLElemStyle('top', '-20px', 'material_palette', false);
eventHTMLElem('click', 'material_icon', false, function(event) {
  if (wood_icon == false) {
    setHTMLElemStyle('display', 'block', 'material_palette', false);
    wood_icon = true;
  } else {
    wood_icon = false;
    setHTMLElemStyle('display', 'none', 'material_palette', false);
  }
});
addHTMLElement('div', 'wood_mat_1', 'TO', 'material_palette', false);
setHTMLElemAttribute('className', 'colors', 'wood_mat_1', false);
setHTMLElemStyle('backgroundImage', 'url(\'wood_basecolor_1.jpg\')', 'wood_mat_1', false);
addHTMLElement('div', 'wood_mat_2', 'TO', 'material_palette', false);
setHTMLElemAttribute('className', 'colors', 'wood_mat_2', false);
setHTMLElemStyle('backgroundImage', 'url(\'box.floor2.jpg\')', 'wood_mat_2', false);
addHTMLElement('div', 'wood_mat_3', 'TO', 'material_palette', false);
setHTMLElemAttribute('className', 'colors', 'wood_mat_3', false);
setHTMLElemStyle('backgroundImage', 'url(\'box.floor3.jpg\')', 'wood_mat_3', false);

ground_icon = false;
addHTMLElement('div', 'ground_icon', 'TO', ['CONTAINER'], false);
setHTMLElemAttribute('className', 'interraction_icon', 'ground_icon', false);
bindHTMLObject('floor_icon', 'ground_icon', false);
setHTMLElemStyle('left', '-20px', 'ground_icon', false);
setHTMLElemStyle('top', '-20px', 'ground_icon', false);
setHTMLElemStyle('backgroundImage', 'url(icons/paint-brush-solid.svg)', 'ground_icon', false);
addHTMLElement('div', 'ground_palette', 'TO', ['CONTAINER'], false);
setHTMLElemAttribute('className', 'painting_palette', 'ground_palette', false);
bindHTMLObject('floor_icon', 'ground_palette', false);
setHTMLElemStyle('left', '30px', 'ground_palette', false);
setHTMLElemStyle('top', '-20px', 'ground_palette', false);
eventHTMLElem('click', 'ground_icon', false, function(event) {
  if (wood_icon == false) {
    setHTMLElemStyle('display', 'block', 'ground_palette', false);
    wood_icon = true;
  } else {
    wood_icon = false;
    setHTMLElemStyle('display', 'none', 'ground_palette', false);
  }
});
addHTMLElement('div', 'ground_mat_1', 'TO', 'ground_palette', false);
setHTMLElemAttribute('className', 'colors', 'ground_mat_1', false);
setHTMLElemStyle('backgroundImage', 'url(\'floor.6.jpg\')', 'ground_mat_1', false);
addHTMLElement('div', 'ground_mat_2', 'TO', 'ground_palette', false);
setHTMLElemAttribute('className', 'colors', 'ground_mat_2', false);
setHTMLElemStyle('backgroundImage', 'url(\'4.2.jpg\')', 'ground_mat_2', false);
addHTMLElement('div', 'ground_mat_3', 'TO', 'ground_palette', false);
setHTMLElemAttribute('className', 'colors', 'ground_mat_3', false);
setHTMLElemStyle('backgroundImage', 'url(\'4.3.jpg\')', 'ground_mat_3', false);

markers_visible = true;
addHTMLElement('div', 'markers_hide_show', 'TO', ['CONTAINER'], false);
setHTMLElemAttribute('className', 'markers_hide_show', 'markers_hide_show', false);
setHTMLElemStyle('backgroundImage', 'url(icons/markers_visible.svg)', 'markers_hide_show', false);

eventHTMLElem('click', 'markers_hide_show', false, function(event) {
  if (markers_visible == true) {
    setCSSRuleStyle('visibility', 'hidden', '.interraction_icon', false, '');
    setCSSRuleStyle('visibility', 'hidden', '.painting_palette', false, '');
    markers_visible = false;
    setHTMLElemStyle('backgroundImage', 'url(icons/markers_hidden.svg)', 'markers_hide_show', false);
  } else {
    setCSSRuleStyle('visibility', 'visible', '.interraction_icon', false, '');
    setCSSRuleStyle('visibility', 'visible', '.painting_palette', false, '');
    markers_visible = true;
    setHTMLElemStyle('backgroundImage', 'url(icons/markers_visible.svg)', 'markers_hide_show', false);
  }
});

eventHTMLElem('click', ['wood_mat_1', 'wood_mat_2', 'wood_mat_3'], false, function(event) {
  replaceTexture('wood_1', 'wood_basecolor_1.jpg', subsequenceFromStartFromEnd(getHTMLElemStyle('backgroundImage', getEventProperty('target.id', event), false), 5, 2), function() {});
});
eventHTMLElem('click', ['ground_mat_1', 'ground_mat_2', 'ground_mat_3'], false, function(event) {
  replaceTexture('ground', 'floor.6.jpg', subsequenceFromStartFromEnd(getHTMLElemStyle('backgroundImage', getEventProperty('target.id', event), false), 5, 2), function() {});
});



} // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */
