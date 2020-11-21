() => {
  block('topbar')({
    content: (node, ctx) => {
      const paramLogo = ctx.content[0];
      const paramMenu = ctx.content[1];
      const paramLinks = ctx.content[2];

      // begin logo
      const logo = {
        block: 'logo',
        mix: {block: 'topbar', elem: 'logo'},
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
          block: 'link',
          mix: {block: 'menu', elem: 'link'},
          attrs: {src: src},
          content: title
        }

        menu.content.push({
          block: 'menu-item',
          mix: {block: 'menu', elem: 'item'},
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
          block: 'link',
          mix: {block: 'menu', elem: 'link'},
          attrs: {src: src},
          content: title
        }

        links.content.push({
          block: 'menu-item',
          mix: {block: 'menu', elem: 'item'},
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
