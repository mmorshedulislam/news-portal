const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

const displayNews = (allNews) => {
  const newsCount = document.getElementById("news-count");
  newsCount.innerText = `${allNews.length ? allNews.length : "No News Found"}`;
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.textContent = ``;
  allNews.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("row", "news-item", "my-3");
    newsDiv.innerHTML = `
      <div class="col-md-3 d-flex align-items-center">
        <div class="news-thumbnail">
            <img src="${
              news.thumbnail_url
            }" class="img-fluid mb-3 w-100" alt="" />
        </div>
      </div>
      <div class="col-md-9 align-items-center d-flex">
        <div>
            <!-- POST DESCRIPTION -->
            <div class="news-description">
            <h3 class="fw-bold my-3" onclick="loadNewsDetail('${
              news._id
            }')" type="button"
            class="btn"
            data-bs-toggle="modal"
            data-bs-target="#newsDetails">
                ${news.title}
            </h3>
            <p>
               ${news.details.slice(0, 450)}
            </p>
            </div>
            <div class="news-info container d-flex align-items-center justify-content-between">
            <div class="author-details d-flex align-items-center">
                <img src="${
                  news.author.img
                }" style="width: 50px; border-radius: 50%" class="img-fluid me-3" alt="" />
                <div class="author-name">
                <span class="fw-bold">${news.author.name}</span> <br />
                <span>${news.author.published_date}</span>
                </div>
            </div>
            <!-- VIEWS -->
            <div class="fw-bold fs-5">
                <p>
                <span><i class="fa-regular fa-eye"></i></span>
                <span>${news.total_view}</span>
                </p>
            </div>
            <!-- RATING -->
            <div class="rating fs-5">
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
            </div>
            <!-- DETAIL ICON -->
            <div class="detail-icon">
                <a onclick="loadNewsDetail('${news._id}')"
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#newsDetails"
              >
                <i class="fa-solid fa-arrow-right-long"></i>
              </a>
            </div>
            </div>
        </div>
      </div>

      `;
    newsContainer.appendChild(newsDiv);
    toggleLoader("stop");
  });
};

const loader = document.getElementById("loader");
const toggleLoader = (isLoading) => {
  if (isLoading === "start") {
    loader.classList.remove("d-none");
  } else if (isLoading === "stop") {
    loader.classList.add("d-none");
  }
};

const loadNewsDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetail(data.data[0]);
};

const displayNewsDetail = (newsDetail) => {
  const modalTitle = document.getElementById("newsDetailsLabel");
  modalTitle.innerText = `${newsDetail.title}`;

  const modalBody = document.getElementById("news-detail-body");
  modalBody.innerHTML = `
  <div class="d-flex align-items-center">
    <div class="news-thumbnail w-100">
        <img src="${
          newsDetail.thumbnail_url
        }" class="img-fluid mb-3 w-100" alt="" />
    </div>
  </div>

  <div class="align-items-center d-flex">
        <div>
            <!-- POST DESCRIPTION -->
            <div class="news-description">
            <h3 class="fw-bold my-3">
                ${newsDetail.title}
            </h3>
            <p>
               ${newsDetail.details.slice(0, 450)}
            </p>
            </div>
        <div class="news-info d-flex align-items-center justify-content-between">
            <div class="author-details d-flex align-items-center">
                <img src="${
                  newsDetail.author.img
                }" style="width: 50px; border-radius: 50%" class="img-fluid me-3" alt="" />
                <div class="author-name">
                <span class="fw-bold">${newsDetail.author.name}</span> <br />
                <span>${newsDetail.author.published_date}</span>
                </div>
            </div>
            <!-- VIEWS -->
            <div class="fw-bold fs-5 d-flex align-items-center">
                <p>
                <span><i class="fa-regular fa-eye"></i></span>
                <span>${newsDetail.total_view}</span>
                </p>
            </div>
            <!-- RATING -->
            <div class="rating fs-5">
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
                <span><i class="fa-regular fa-star"></i></span>
            </div>
          </div>
        </div>
      </div>
  
  `;
};

loadNews("03");
