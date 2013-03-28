var SimpleColorPicker = {

    pickedColor: {

        'hex': '',
        'rgb': ''

    },
    
    // options { appendTo: 'element', 'window', $('#object') }
    // elem
    init: function(options, elem){
        
        this.settings = $.extend({appendTo: 'element'}, options);
        this.elem = elem;
        
        this.setDebug(true);
        this.start();
        
    },
    
    start: function(){
        
        this.log('start()');
        
        this.setDefaultColors();
        this.initEvents();
        
    },
    
    setDebug: function(status){

        this.debug = status || false;

    },
    
    log: function(msg){

        if(!this.debug){ return false; }
    
        try{ console.log(msg); } catch(e) { }

    },  

    hexDigits: ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],   

    hex: function(x) {

        return isNaN(x) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];

    },

    rgbStringToArray: function(string){


    },

    //Function to convert hex format to a rgb color
    rgbtohex: function(rgb) {

        rgb = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
        
        if(rgb && typeof rgb === 'object'){
            return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
        } else {
            return null;
        }

    },      
    
    initHtmlContainer: function(position){
        
        this.log('initHtmlContainer()');
        
        if(this.htmlContainer){
            $('#SimpleColorPicker').css({top: position.top + this.elem.outerHeight(true), left: position.left});
        } else {

            // Create the container.
            this.htmlContainer = $('<div></div>').attr({id:'SimpleColorPicker'}).addClass('SimpleColorPicker').css({top: position.top + this.elem.outerHeight(true), left: position.left, position: 'absolute', width: this.elem.outerWidth(true), height: 'auto'});   
            // Populate the container with colors.         
            this.htmlContainer.html(this.initColorContainer());
            // Enable events.
            this.initHtmlContainerEvents();
        }
        
    },

    initColorContainer: function(){

        var i, htmlColors = [];

        for(i in this.defaultColors['default']){

            htmlColors.push('<div class="colorBox" style="width:9px; height:9px; background-color:#'+this.defaultColors['default'][i]+'; border:1px solid #ccc; float:left; border-collapse: collapse; margin:1px; cursor:pointer;"></div>');

        }

        return this.colorContainer = htmlColors.join('');

    },
    
    initEvents: function(){
      
      var _this = this;
      
      this.elem.on('focus', function(e){
          
          //var position = $(this).offset();
          var position = $(this).position();
          _this.log(position.top + ' ' + position.left);
          
           _this.initHtmlContainer(position);
           
           _this.htmlContainer.insertAfter(_this.elem);
          
      });
        
    },

    initHtmlContainerEvents: function(){

        var _this = this;

        this.htmlContainer.on('click', '.colorBox', function(e){

            _this.pickedColor['rgb'] = $(this).css('background-color')
            _this.pickedColor['hex'] = _this.rgbtohex(_this.pickedColor['rgb']);

            _this.log(_this.pickedColor);

            _this.elem.css({'background-color': _this.pickedColor['hex']}).val(_this.pickedColor['hex']).data(_this.pickedColor);


        });

    },

    checkContrast: function(){

        var hex = this.hex()

    },
    
    setDefaultColors: function(){

        // http://en.wikipedia.org/wiki/Web_safe_colors#HTML_color_names
        this.defaultColors = {

            'websafe': ['FFFFFF', 'C0C0C0', '808080', '000000', 
                        'FF0000', '800000', 'FFFF00', '808000', 
                        '00FF00', '008000', '00FFFF', '008080', 
                        '0000FF', '000080', 'FF00FF', '800080'],

            'default': [ '990033', 'ff3366', 'cc0033', 'ff0033', 'ff9999', 'cc3366', 'ffccff', 'cc6699',
                          '993366', '660033', 'cc3399', 'ff99cc', 'ff66cc', 'ff99ff', 'ff6699', 'cc0066',
                          'ff0066', 'ff3399', 'ff0099', 'ff33cc', 'ff00cc', 'ff66ff', 'ff33ff', 'ff00ff',
                          'cc0099', '990066', 'cc66cc', 'cc33cc', 'cc99ff', 'cc66ff', 'cc33ff', '993399',
                          'cc00cc', 'cc00ff', '9900cc', '990099', 'cc99cc', '996699', '663366', '660099',
                          '9933cc', '660066', '9900ff', '9933ff', '9966cc', '330033', '663399', '6633cc',
                          '6600cc', '9966ff', '330066', '6600ff', '6633ff', 'ccccff', '9999ff', '9999cc',
                          '6666cc', '6666ff', '666699', '333366', '333399', '330099', '3300cc', '3300ff',
                          '3333ff', '3333cc', '0066ff', '0033ff', '3366ff', '3366cc', '000066', '000033',
                          '0000ff', '000099', '0033cc', '0000cc', '336699', '0066cc', '99ccff', '6699ff',
                          '003366', '6699cc', '006699', '3399cc', '0099cc', '66ccff', '3399ff', '003399',
                          '0099ff', '33ccff', '00ccff', '99ffff', '66ffff', '33ffff', '00ffff', '00cccc',
                          '009999', '669999', '99cccc', 'ccffff', '33cccc', '66cccc', '339999', '336666',
                          '006666', '003333', '00ffcc', '33ffcc', '33cc99', '00cc99', '66ffcc', '99ffcc',
                          '00ff99', '339966', '006633', '336633', '669966', '66cc66', '99ff99', '66ff66',
                          '339933', '99cc99', '66ff99', '33ff99', '33cc66', '00cc66', '66cc99', '009966',
                          '009933', '33ff66', '00ff66', 'ccffcc', 'ccff99', '99ff66', '99ff33', '00ff33',
                          '33ff33', '00cc33', '33cc33', '66ff33', '00ff00', '66cc33', '006600', '003300',
                          '009900', '33ff00', '66ff00', '99ff00', '66cc00', '00cc00', '33cc00', '339900',
                          '99cc66', '669933', '99cc33', '336600', '669900', '99cc00', 'ccff66', 'ccff33',
                          'ccff00', '999900', 'cccc00', 'cccc33', '333300', '666600', '999933', 'cccc66',
                          '666633', '999966', 'cccc99', 'ffffcc', 'ffff99', 'ffff66', 'ffff33', 'ffff00',
                          'ffcc00', 'ffcc66', 'ffcc33', 'cc9933', '996600', 'cc9900', 'ff9900', 'cc6600',
                          '993300', 'cc6633', '663300', 'ff9966', 'ff6633', 'ff9933', 'ff6600', 'cc3300',
                          '996633', '330000', '663333', '996666', 'cc9999', '993333', 'cc6666', 'ffcccc',
                          'ff3333', 'cc3333', 'ff6666', '660000', '990000', 'cc0000', 'ff0000', 'ff3300',
                          'cc9966', 'ffcc99', 'ffffff', 'cccccc', '999999', '666666', '333333', '000000'
                    ]

        };
        
    }
    
};

$.SimpleColorPicker = $.fn.SimpleColorPicker = function(options){
    
    return SimpleColorPicker.init(options, this);   
    
}