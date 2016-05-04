var main = function(toDoObjects) {
    "use strict";
    console.log("SANITY CHECK");
    // ==== ko viewmodel  =====================================
    var itemVM = function() {
        var self = this;
        self.itemArray = ko.observableArray([]);
        self.itemArray = toDoObjects.map(function(toDo) {
            //each obj in array
            return {
                "description": toDo.description,
                "tags": toDo.tags
            };
        }); // map
        //alert('The first element is ', self.itemArray[0].tags);

        $(".tabs a span").toArray().forEach(function(element) {
            var $element = $(element);

            // create a click handler for this element
            $element.on("click", function() {
                var $content,
                    $input,
                    $button,
                    i;

                $(".tabs a span").removeClass("active");
                $element.addClass("active");
                $("main .content").empty();

                if ($element.parent().is(":nth-child(1)")) {
                    $content = $("<ul>");
                    for (i = self.itemArray.length - 1; i >= 0; i--) {
                        $content.append($("<li>").text(self.itemArray[i].description));
                    }
                } else if ($element.parent().is(":nth-child(2)")) {
                    $content = $("<ul>");
                    self.itemArray.forEach(function(todo) {
                        $content.append($("<li>").text(todo.description));
                    });
                } else if ($element.parent().is(":nth-child(3)")) {
                    var tags = [];
                    self.itemArray.forEach(function(toDo) {
                        toDo.tags.forEach(function(tag) {
                            if (tags.indexOf(tag) === -1) {
                                tags.push(tag);
                            }
                        });
                    });
                    console.log(tags);

                    var tagObjects = tags.map(function(tag) {
                        var toDosWithTag = [];

                        self.itemArray.forEach(function(toDo) {
                            if (toDo.tags.indexOf(tag) !== -1) {
                                toDosWithTag.push(toDo.description);
                            }
                        });

                        return {
                            "name": tag,
                            "toDos": toDosWithTag
                        };
                    });

                    console.log(tagObjects);

                    tagObjects.forEach(function(tag) {
                        var $tagName = $("<h3>").text(tag.name),
                            $content = $("<ul>");


                        tag.toDos.forEach(function(description) {
                            var $li = $("<li>").text(description);
                            $content.append($li);
                        });

                        $("main .content").append($tagName);
                        $("main .content").append($content);
                    });

                } else if ($element.parent().is(":nth-child(4)")) {
                    var $input = $("<input>").addClass("description"),
                        $inputLabel = $("<p>").text("Description: "),
                        $tagInput = $("<input>").addClass("tags"),
                        $tagLabel = $("<p>").text("Tags: "),
                        $button = $("<span>").text("+");

                    $button.on("click", function() {
                        var description = $input.val(),
                            tags = $tagInput.val().split(","),
                            newToDo = {
                                "description": description,
                                "tags": tags
                            };

                        $.post("todos", newToDo, function(result) {
                            console.log(result);
                            //toDoObjects.push(newToDo);
                            //toDoObjects = result;

                            // update toDos
                            self.itemArray = toDoObjects.map(function(toDo) {
                                return {
                                    "description": toDo.description,
                                    "tags": toDo.tags
                                };
                            });

                            $input.val("");
                            $tagInput.val("");
                        });
                    });

                    $content = $("<div>").append($inputLabel)
                        .append($input)
                        .append($tagLabel)
                        .append($tagInput)
                        .append($button);
                } // end else if 4

                $("main .content").append($content);

                return false;
            }); // end $element.on("click", 
        }); // end  $(".tabs a span").toArray().forEach

        $(".tabs a:first-child span").trigger("click");

    }; // end itemVM

    ko.applyBindings(new itemVM());
    // =============================================
}; //end main

$(document).ready(function() {
    $.getJSON("todos.json", function(toDoObjects) {
        main(toDoObjects);
    });
});