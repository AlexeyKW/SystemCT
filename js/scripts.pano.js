var panorama1, panorama2, panorama3, viewer, container, infospot, font;

container = document.querySelector( '#container' );

function createTextShape ( message, size = 10, count ) {
        message = makeMultiLine( message, count );
        var shapes = font.generateShapes( message, size );
        var geometry = new THREE.ShapeGeometry( shapes );
        var matLite = new THREE.MeshBasicMaterial( {
          color: 0xffffff,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide
        } );
        geometry.computeBoundingBox();
        var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        geometry.translate( xMid, 0, 0 );
        return new THREE.Mesh( geometry, matLite );
}
function makeMultiLine ( text = '', count = 40 ) {
        let lineCharacterLimit = 0;
        return text.split(' ').map( word => {
          lineCharacterLimit += word.length;
          if ( lineCharacterLimit > count ) {
            word += '\n';
            lineCharacterLimit = 0;
          }
          return word;
        }).join(' ').replace( /\n /g, '\n' );
}

panorama1 = new PANOLENS.ImagePanorama( './asset/PIC_1.jpg' );
panorama2 = new PANOLENS.ImagePanorama( './asset/PIC_2.jpg' );
panorama3 = new PANOLENS.ImagePanorama( './asset/PIC_3.jpg' );

viewer = new PANOLENS.Viewer( {output: 'console', container: container});
viewer.add( panorama1, panorama2, panorama3);

panorama1.link( panorama2, new THREE.Vector3( 2929.11, -382.13, 4033.58 ) );
panorama1.link( panorama3, new THREE.Vector3( -3872.30, -205.12, -3139.51 ) );

panorama1.addEventListener( 'enter-fade-start', function(){
  viewer.tweenControlCenter( new THREE.Vector3(-3961.93, -129.13, 3033.56), 0 );
} );

panorama2.link( panorama1, new THREE.Vector3( 4940.84, 35.20, 714.40 ) );
panorama2.link( panorama3, new THREE.Vector3( 2975.85, 11.64, 4014.60 ) );

panorama2.addEventListener( 'enter-fade-start', function(){
  viewer.tweenControlCenter( new THREE.Vector3(4915.03, 497.09, 708.60), 0 );
} );

panorama3.link( panorama1, new THREE.Vector3( -4249.79, 188.16, -2610.16 ) );
panorama3.link( panorama2, new THREE.Vector3( -4982.69, 282.94, 118.11 ) );

panorama3.addEventListener( 'enter-fade-start', function(){
  viewer.tweenControlCenter( new THREE.Vector3(-4259.60, -296.98, -2587.20), 0 );
} );

radius = 1500;
var loader = new THREE.FontLoader();
var info_p1_1;

loader.load( './fonts/tbi.json', onFontLoaded );
function onFontLoaded ( _font ) {
        font = _font;

info_p1_1 = new PANOLENS.Infospot( 300, PANOLENS.DataImage.Info );
info_p1_1.position.set( -3028.99, -126.81, 3965.75 );
info_p1_1.addHoverElement( document.getElementById( 'desc-p1_1' ), 200 );
panorama1.add( info_p1_1 );

}

function createLabel(text='', angle=0, height=0)
{
    titleSprite = createTextShape( text, 15);
    titleSprite.position.set( radius * Math.sin( -angle ), height, radius * Math.cos( -angle ) );
    titleSprite.position.y += 45;
    titleSprite.rotation.y = Math.PI - angle;
    titleSprite.scale.multiplyScalar( 2 );
    return titleSprite;
}




