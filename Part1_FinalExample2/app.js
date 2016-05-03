  var CommentListVM = function() {
      var self = this;
      self.commentInput = ko.observable("");
      self.comment = ko.observable();
      self.commentArray = ko.observableArray();
      self.commentArray.push("This is the first comment!");
      self.commentArray.push("Here's the second one!");
      self.commentArray.push("And this is one more");
      self.commentArray.push("Here is another one!");
      self.addComment = function() {
          //enable: commentInput().length>0,
          if (this.commentInput() != "") {
              self.commentArray.push(self.commentInput());
              self.commentInput("");
          }
      };
  };
  ko.applyBindings(new CommentListVM());