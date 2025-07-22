fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById("menu");

    // Images to inject randomly
    const imageSources = [
      'images/facial.jpg',
      'images/haircare.jpg',
      'images/henna.jpg',
      'images/nails.jpg'
    ];

    // Combine service sections and images into one array
    const allItems = [];

    // Push service sections
    data.categories.forEach(category => {
      allItems.push({
        type: 'section',
        content: category
      });
    });

    // Push image cards
    imageSources.forEach(src => {
      allItems.push({
        type: 'image',
        src: src
      });
    });

    // Shuffle the combined array to mix images and service blocks
    const shuffled = allItems
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(obj => obj.value);

    // Render the shuffled content
    shuffled.forEach(item => {
      if (item.type === 'section') {
        const section = document.createElement("div");
        section.className = "section";

        const heading = document.createElement("h2");
        heading.textContent = item.content.title;
        section.appendChild(heading);

        const list = document.createElement("ul");
        item.content.items.forEach(i => {
          const li = document.createElement("li");
          li.textContent = `${i.name} – ${i.price}`;
          list.appendChild(li);
        });

        section.appendChild(list);
        menuContainer.appendChild(section);
      } else if (item.type === 'image') {
        const imgCard = document.createElement('div');
        imgCard.className = 'section image-card';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = 'Salon visual';
        imgCard.appendChild(img);

        menuContainer.appendChild(imgCard);
      }
    });
  })
  .catch(error => {
    console.error("Failed to load price list:", error);
    document.getElementById("menu").innerHTML =
      "<p>Unable to load price list. Please try again later.</p>";
  });
