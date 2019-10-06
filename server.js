//homepage "," "/" ""
//"/product" =>product page
//"/api"=> api(display json data to browser)
//error 404
var http=require("http");
var fs=require("fs");
var json=fs.readFileSync("./data.json");
var template=fs.readFileSync("./templates/product.html");
var cardtemplate=fs.readFileSync("./templates/card.html");
var overviewtemplate=fs.readFileSync("./templates/overview.html")+"";
template=template+"";
cardtemplate=cardtemplate+"";
json=JSON.parse(json);//convert to JSON object
var url=require("url");
function replace(template,product)
{
    template=template.replace(/#Image#/g,product["image"]);
    template=template.replace(/#Productname/g,product["productName"]);
    template=template.replace(/#From#/g,product["from"]);
    template=template.replace(/#Nutrients/g,product["nutrients"]);
    template=template.replace(/#Quantity#/g,product["quantity"]);
    template=template.replace(/#Price#/g,product["price"]);
    template=template.replace(/#Description#/g,product["description"]);
    template=template.replace(/#id#/g,product["id"]);
    if(product["organic"]==false)
    {
        template=template.replace(/#Organic#/g,"Not Organic");
    }
    else
    {
        template=template.replace(/#Organic#/g,"not-organic");
    }
    return template;
}
var server=http.createServer(function(req,res)
{
   console.log(req.url);
    var query=url.parse(req.url,true);
    //console.log(query);
    var id=query["query"]["id"];
    //console.log(id);
   if(req.url=="/homepage"||req.url=="/"||req.url=="")
   {
      // res.write("<h1>HOMEPAGE</h1>");
      var cards="";
      for(var i=0;i<json.length;i++)
      {
          cards = cards + replace(cardtemplate,json[i]);
      }
      overviewtemplate=overviewtemplate.replace(/#Card#/g,cards);
      res.write(overviewtemplate);
   }
   else if(query.pathname=="/product")
   {
        var page=replace(template,json[id]); 
        res.write(page);
   }    
   else if(req.url=="/api")
   {
       res.write(json);
   }
   else
   {
       res.write("<h1>404 Page not Found</h1>");
   }
   res.end();
});
server.listen(3000,function()
{
    console.log("server is listening at port 3000");
});