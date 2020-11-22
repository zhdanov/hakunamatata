() => {
  block('topbar')({
    content: (node, ctx) => {
      const paramLogo = ctx.content.logo;
      const paramMenu = ctx.content.menu;
      const paramLinks = ctx.content.links;

      // begin logo
      const logo = {
        elem: 'logo',
        attrs: {
          'src': paramLogo
        }
      };
      // end logo

      // begin menu
      const menu = {
        block: 'menu',
        mix: {block: 'topbar', elem: 'menu'},
        content: []
      };

      paramMenu.forEach((i)=>{
        const title = i[0];
        const src = i[1];

        const link = {
          elem: 'link',
          attrs: {src: src},
          content: title
        }

        menu.content.push({
          elem: 'item',
          content: link
        }); 
      });
      // end menu

      // begin links
      const links = {
        block: 'menu',
        mix: {block: 'topbar', elem: 'links'},
        content: []
      };

      paramLinks.forEach((i)=>{
        const title = i[0];
        const src = i[1];

        const link = {
          elem: 'link',
          attrs: {src: src},
          content: title
        }

        links.content.push({
          elem: 'item',
          content: link
        }); 
      });
      // end links

      return [
        logo,
        menu,
        links
      ];
    }
  });
}
