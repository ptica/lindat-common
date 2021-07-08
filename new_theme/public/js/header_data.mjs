class HeaderData{

  static header_nav_items = [
    {'name': 'Search', 'url': '/#search'},
    {'name': 'Catalogue', 'url': 'https://lindat.mff.cuni.cz/repository/xmlui/?locale-attribute=en'}, //XXX
    {'name': 'Education', 'url': '/#education'},
    {'name': 'Projects', 'url': '/#projects'},
    {'name': 'Tools', 'url': '/#tools'},
    {'name': 'Services', 'url': '/en/services'}, //XXX
    {'name': 'About', 'url': '/', 'dropdown': [
        {'name': 'Partners', 'url': '/partners'},
        {'name': 'Mission Statement', 'url': '/files/mission-en.pdf'},
        {'name': 'CLARIN', 'url': 'https://www.clarin.eu/'},
        {'name': 'DARIAH', 'url': 'https://www.dariah.eu/'},
        {'name': 'Service integrations', 'url': '/integration'}, //XXX
        {'name': 'Project partnerships', 'url': '/partnership'}, //XXX
      ]}
  ];
  static nav_items(){
    let out = ''
    for(const item of HeaderData.header_nav_items){
      /* build dropdown menu first if this item is a dropdown toggle */
      let dd = '';
      if(item.dropdown){
        dd += '<div class="lindat-dropdown-menu">'
        for(const dd_item of item.dropdown){
          dd += `
               <a href="${dd_item.url}" class="lindat-dropdown-item">${dd_item.name}</a>
            `
        }
        dd += '</div>'
      }
      /* build normal list of items */
      out += `
          <li class="lindat-nav-item ${item.dropdown ? 'lindat-dropdown' : ''}">
              <a href="${item.url}" class="lindat-nav-link ${item.dropdown ? 'lindat-dropdown-toggle' : ''}"
                                    ${item.dropdown ? ' data-toggle="dropdown"' : ''}
                                    ${item.dropdown ? ' onclick="this.parentNode.querySelector(\'.lindat-dropdown-toggle+div.lindat-dropdown-menu\').classList.toggle(\'lindat-show\'); return false;"' : ''}
                                    >${item.name}</a>
              ${item.dropdown ? dd : ''}
          </li>
        `
    }
    return out;
  }

  static buildHtml(options){
    const version = options.VERSION
    const build = options.REV
    return `
<div class="lindat-common lindat-common-header">
<header data-version="${version}" data-build="${build}">
    <nav class="lindat-navbar lindat-navbar-expand-lg lindat-justify-content-between lindat-navbar-dark ">
        <div class="lindat-block lindat-block--clariah-theme-branding">
            <a href="https://lindat.mff.cuni.cz/" class="lindat-navbar-brand lindat-d-flex lindat-align-items-center " aria-label="">
                <img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" width="auto" height="53" alt="LINDAT/CLARIAH-CZ logo" class="" />
            </a>
        </div>
        <button class="lindat-navbar-toggler" type="button" data-toggle="collapse" data-target=".lindat-navbar-collapse" aria-controls="lindat-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation"
                onclick="this.parentNode.querySelector('.lindat-navbar-toggler+div.lindat-collapse.lindat-navbar-collapse').classList.toggle('lindat-show')">
            <span class="lindat-navbar-toggler-icon"></span>
        </button>
        <div class="lindat-collapse lindat-navbar-collapse">
            <div class="lindat-mr-auto">
                <div class="lindat-block lindat-block--clariah-theme-main-menu">
                    <ul class="lindat-nav lindat-navbar-nav">
                        ${HeaderData.nav_items()}
                    </ul>
                </div>
            </div>
            <div class="lindat-block lindat-block--clariah-theme-account-menu">
                <ul class="lindat-nav lindat-navbar-nav">
                    <li class="lindat-nav-item  ">
                        <a class="lindat-nav-link lindat-nav-link-dariah" href="https://www.dariah.eu/"><img src="https://lindat.mff.cuni.cz/images/dariah-eu.png" alt="DARIAH logo" /></a>
                    </li>
                    <li class="lindat-nav-item  ">
                        <a class="lindat-nav-link lindat-nav-link-clarin" href="https://www.clarin.eu/"><img src="https://lindat.mff.cuni.cz/images/clarin.png" alt="CLARIN logo" /></a>
                    </li>
                </ul>
            </div>
            <slot name="languageswitcher"></slot>
        </div>
    </nav>
</header>
</div>
    `
  }

}

export {HeaderData}
