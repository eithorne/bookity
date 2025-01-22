---
title: Bookity Template
tags:
  - navigation
order: 1
---

# Hello world!

---

This is your homepage file, set with the default layout template of a header, a footer, and a body where youre markdown file contents will go (what you're reading right now!)

## Things to note:

##### You should reach out to other authors and connect your websites!

Ever heard of a webring? If you havent, it's a way you and your friends can all easily link your websites together and promote each other!

Going independent doesn't mean you have to go it solo, before we had social media and advanced search engines people used to use webrings to find interesting new websites to explore.

[Onionring](https://garlic.garden/onionring) is a simple javascript widget that takes care of the finnicky parts of getting a webring set up for you, so all you need to do is get some friends together and make some websites. One person in the group will need to manage the list itself and host the webring files, but they're all included in the Bookity template already so anyone can set up a ring whenever they like!

If you're feeling particularly ambitious, you could even reach out to people who aren't yet your friends, or take applications to join your webring!

Do be aware that in order to participate in the webring, everyone will need to be able to include the javascript files on their website somewhere.

---

##### Bootstrap 5.3 is included, with Toyhouse Compatibility!

If you're familiar with the website [Toyhouse](https://toyhou.se), you might already be familiar with bootstrap. Toyhouse uses a custom version of Bootstrap 4, and its community has made a lot of free and paid layouts for character profile layouts and cast pages and whatnot using Bootstrap.

Bootstrap 5 comes with a lot of great improvements and new features, but v4 -> v5 also came with a lot of breaking changes, and Toyhouse has a variety of custom tweaks going on that also change the default behaviour of v4. This means normally, you cannot use Toyhouse layouts off of Toyhouse without a lot of debugging.

So I've set up a custom version of v5.3 that also includes backwards compatibility with the specific version of Bootstrap used on Toyhouse.

{% card "Watch out!", "bg-body-tertiary mb-3" %}

If you want to use a Toyhouse layout off of Toyhouse, you will need to get permission from the creator of that layout first.

Additionally, I can't guarantee that every code will work! I've done my best to fix the breaking changes, but while you have complete freedom with your code on your own website, TH coders are limited in what they have access to and this leads to some hacky solutions that might not behave the same way off of Toyhouse.

One thing to be aware of: Toyhouse has access to Font Awesome 6 Pro, but unless you have a pro license and set that up yourself, you'll be limited to just the free icons, which might break some layouts.

To help make up for the missing icons, another icon font has also been included: [Phosphor Icons](https://phosphoricons.com/). More below!
{% endcard %}

But in any case, my hope is that this will make it easier for you to create your webpages if you're not very confident creating your own layouts, particularly for any character profiles you might want to include!

---

##### Fontawesome 6 Free & Phosphor Icons are included

###### <span class="text-muted fst-italic">TODO: introduce and explain phosphor icons, also add a phosphor shortcode</span>

You can use these icons like usual with `<i class="fa-solid fa-heart">`, or you can use the provided shortcode `{% raw %}{% fa "heart" %}{% endraw %}`, and both will result in {% fa "heart" %}

For the shortcode, if you provide just the icon name it'll assume you want that icon in the solid style:  
{% raw %}`{% fa "heart" %}`{% endraw %} => {% fa "heart" %}

But you can also pass a style and an icon like so:  
{% raw %}`{% fa {icon: "heart", style: "regular"} %}`{% endraw %} => {% fa {icon: "heart", style: "regular"} %}
{% raw %}`{% fa {icon: "bluesky", style: "brands"} %}`{% endraw %} => {% fa {icon: "bluesky", style: "brands"} %}

If you want to give it non-fontawesome classes, you can give it a second string
{% raw %}`{% fa "heart", "text-danger" %}`{% endraw %} => {% fa "heart", "text-danger" %}  
{% raw %}`{% fa {icon: "bluesky", style: "brands"}, "text-primary" %}`{% endraw %} => {% fa {icon: "bluesky", style: "brands"}, "text-primary" %}

Lastly, if you give it a third string that will be used for the inline styling.  
{% raw %}`{% fa {icon: "triangle-exclamation", animation: "fa-beat-fade"}, null, "--fa-animation-duration: 2s;font-size:1.5em" %}`{% endraw %} => {% fa {icon: "triangle-exclamation", animation: "fa-beat-fade"}, null, "--fa-animation-duration: 2s;font-size:1.5em" %}

---

## Some useful references:

[CommonMark Markdown Reference](https://commonmark.org/help/) :: If you're not very familiar with markdown, they have a nice tutorial linked at the top that will introduce you to the syntax, and if you are familiar with markdown this link will give you a nice cheatsheet you can reference when you can't quite remember how to include an image for example.

[MDN Intro to Web Development](https://developer.mozilla.org/en-US/docs/Learn_web_development) :: A free, modern tutorial course you can follow to learn HTML, CSS, and even JS! MDN is also a great place to go to look up how to do things if you're not sure. I personally recommend MDN over w3schools, as MDN tends to be more up-to-date.

[11ty Documentation](https://www.11ty.dev/) :: This template will get you started with making your own website, but if you really want to make it your own you might want to watch some tutorials and read the documentation for 11ty!

[Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html) :: You'll also want to have this on hand if you're making your own layouts!

[Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/) :: This will also be helpful for making your own layouts, here you can find information on the different built in classes you can use.

[FontAwesome Icons](https://fontawesome.com/search) :: If you need an icon somewhere have a search!
