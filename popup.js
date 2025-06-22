function getOGImage() {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => {
          const meta = document.querySelector("meta[property='og:image']");
          return meta ? meta.content : null;
        },
      },
      (results) => {
        const output = document.getElementById("output");
        const ogImage = results[0].result;

        if (ogImage) {
          const outputHTML = `
              <img id="og-img" src="${ogImage}" alt="OG Image" />
              <div id="info"></div>
              <br/>
              <a href="${ogImage}" target="_blank">
                <button>Open in New Tab</button>
              </a>
              <a href="${ogImage}" download>
                <button>Download Image</button>
              </a>
            `;
          output.innerHTML = outputHTML;

          const img = document.getElementById("og-img");
          img.onload = () => {
            const info = document.getElementById("info");
            info.innerText = `Dimensions: ${img.naturalWidth}×${img.naturalHeight}`;
          };
        } else {
          output.innerHTML = "<p>No Open Graph image found on this page.</p>";
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", getOGImage);
