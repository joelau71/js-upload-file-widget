/*
    jquery required
    <input type="file" name="upload" class="upload" data-ufw-file="file.pdf" data-ufw-path="/upload">

    upload_file_widget.init($class);
    e.g.: upload_file_widget.init($(".upload"));

    upload_field_widget.generate(field, path, file) will return html element
    field: input attribute name
    path: file path
    name: fiel display name
    e.g.: var element = upload_file_widget.generate("upload", "/upload", "file.pdf");

    status:
    "": no file
    static: no change, but have the file
    remove: remove the file
    update: update the file
*/

upload_file_widget = {
    status: "inactive",
    init: function($class){
        var self = this;
        if (this.status == "active") return false;
        this.status = "active";
        this.$body = $("body");
        if ($class) {
            $class.each(function(){
                var $this = $(this);
                var $parent = $this.parent();
                var field = $this.attr("name")
                var path = $this.attr("data-ufw-path");
                var file = $this.attr("data-ufw-file");
                var element = self.generate(field, path, file);
                $this.remove();
                $parent.append(element);
            });
        }
        this.$body.delegate(".ufw-btn", "click", function(){
            var $content = $(this).parent();
            var $afc = $content.parent();
            $afc.find(".ufw-status").val("remove");
            $afc.find(".ufw-file").val("");
            $afc.find(".ufw-ttl").text("");
            $afc.removeClass("has-data");
        });

        this.$body.delegate(".ufw-file", "change", function(){
            var $this = $(this);
            var fileName = $this.val();
            var $afc = $this.parent().parent();

            $afc.find(".ufw-ttl").text(fileName);
            $afc.find(".ufw-status").val("upload");
            $afc.addClass("has-data");
        });
    },
    generate: function(field, path, file){
        var html = "";
        var path = path || "";
        var file = file || "";
        var has_data = "";
        var status = "";

        if (this.status == "inactive"){
            this.init();
        }

        if (path) {
            has_data = " has-data";
            status = "static";
        }
        
        html += "<div class='upload-file-widget" + has_data + "'>";
        html += "<label class='ufw-file-label'>";
        html += "<input type='file' name='" + field + "' class='ufw-file'>"
        html += "<span class='btn btn-secondary'>";
        html += "UPLOAD";
        html += "</span>";
        html += "</label>";
        html += "<div class='ufw-content'>";
        html += "<a href='" + path + "/" + file;
        html += "' class='ufw-ttl' target='_blank'>";
        html += file;
        html += "</a>";
        html += "<div class='ufw-btn'>";
        html += "</div>";
        html += "</div>";
        html += "<input type='hidden' name='status_" + field + "' value='" + status+ "' class='ufw-status'>";
        html += "</div>";
        
        return html;
    }
};