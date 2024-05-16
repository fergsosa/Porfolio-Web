const d = document;

export default function Tags(tagsUl, tagsInput, btnRemoveAll) {
  const $ul = d.querySelector(tagsUl),
    $input = d.querySelector(tagsInput),
    $deleteAll = d.querySelector(btnRemoveAll);
  let tags = ["html", "css", "js"];

  function showTags() {
    d.querySelectorAll(".tags-input ul li").forEach((li) => {
      li.remove();
    });

    tags.forEach((value, key) => {
      // console.log(value);
      let $newTag = d.createElement("li");
      $newTag.innerText = value;
      let $newRemove = d.createElement("div");
      $newRemove.classList.add("remove");
      $newRemove.setAttribute("onclick", `removeTagItem(${key})`);
      $newTag.appendChild($newRemove);
      $ul.appendChild($newTag);
    });
  }

  function removeTagItem(key) {
    // delete tags[key];
    tags.splice(key, 1); // Utilizar splice para eliminar el elemento del array
    showTags();
  }
  showTags();

  $input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (!tags.includes(this.value)) {
        tags.push(this.value);
        showTags();
      }
      this.value = "";
    }
  });

  $deleteAll.addEventListener("click", () => {
    tags = [];
    showTags();
  });

  // Hacer la función removeTagItem accesible desde fuera de la función Tags
  window.removeTagItem = removeTagItem;
}
