(function () {
  window.createNovelComments = function (section, onClientLoad) {
    const title = section.querySelector('[data-comments-title]');
    const error = section.querySelector('[data-comments-error]');
    const container = section.querySelector('.giscus');
    let backlink = document.querySelector('meta[name="giscus:backlink"]');
    let config;
    let script;
    let frameReady = false;

    if (!backlink) {
      backlink = document.createElement('meta');
      backlink.name = 'giscus:backlink';
      document.head.appendChild(backlink);
    }

    function update() {
      const frame = container.querySelector('iframe');
      if (frame && frame.contentWindow && config && frameReady) {
        frame.contentWindow.postMessage({ giscus: { setConfig: config } }, 'https://giscus.app');
      }
    }

    new MutationObserver(function () {
      const frame = container.querySelector('iframe');
      if (frame) {
        frameReady = false;
        frame.addEventListener('load', function () {
          frameReady = true;
          update();
        });
      }
    }).observe(container, { childList: true });

    return {
      show: function (term, label, url) {
        config = { term: term, backLink: url };
        title.textContent = label;
        backlink.content = url;
        section.hidden = false;

        if (script) {
          update();
          return;
        }

        script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        Object.assign(script.dataset, {
          repo: 'JontCont/blog-novelist',
          repoId: 'R_kgDOUPbfNg',
          category: 'Announcements',
          categoryId: 'DIC_kwDOUPbfNs4DLUFN',
          mapping: 'specific',
          term: term,
          strict: '1',
          reactionsEnabled: '1',
          emitMetadata: '0',
          inputPosition: 'bottom',
          theme: 'preferred_color_scheme',
          lang: 'zh-TW',
          loading: 'lazy'
        });
        script.crossOrigin = 'anonymous';
        script.async = true;
        if (onClientLoad) script.addEventListener('load', onClientLoad);
        script.addEventListener('error', function () {
          error.hidden = false;
          error.textContent = '留言板載入失敗，請重新整理頁面再試。';
        });
        section.appendChild(script);
      },
      hide: function () {
        section.hidden = true;
      }
    };
  };
})();
