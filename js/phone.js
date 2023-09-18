const loadPhone = async (searchText = '13', isShowall) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones);
    displayPhone(phones, isShowall)
}
const displayPhone = (phones, isShowall) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    // display all phone all the phone 
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowall) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // phone slice 
    // console.log('is show all', isShowall);

    if (!isShowall) {
        phones = phones.slice(0, 15)
    }

    phones.forEach(phone => {
        // console.log(phone);
        // Step -1 Crate a Div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-neutral font-bold">${phone.phone_name}!</h2>
            <p class="text-neutral">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDitiles('${phone.slug}')" class="btn btn-primary">Show Details!</button>
            </div>
        </div>
        `;
        // 4 appined chiled
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner 
    toggleloadingSpinner(false)
}

// HANDLE SHOW DITILES 
const handleShowDitiles = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    // console.log(data);
    const phone = data.data
    showPhoneDitiles(phone)
}

// SHOW PHONE DITILES 
const showPhoneDitiles = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img class="p-4" src="${phone.image}" alt="">
    <p class="font-bold mt-2">Storage: ${phone?.mainFeatures?.storage}</p>
    <h2 class="text-xl mt-2">Brand: ${phone?.brand}</h2>
    <p class="mt-2"><span>Display: ${phone?.mainFeatures?.displaySize}</span></p>
    <p class="mt-2"><span>Memory: ${phone?.mainFeatures?.memory}</span></p>
    <p class="mt-2"><span>Bluetooth: ${phone?.others?.Bluetooth}</span> </p>
    <p class="mt-2"><span>GPS: ${phone?.others?.GPS}</span> </p>
    <p class="mt-2"><span>NFC: ${phone?.others?.NFC}</span> </p>
    <p class="mt-2"><span>Radio: ${phone?.others?.Radio}</span> </p>
    <p class="mt-2"><span>USB: ${phone?.others?.USB}</span> </p>
    <p class="mt-2"><span>WLAN: ${phone?.others?.WLAN}</span> </p>

    <p class="mt-2">Storage: ${phone?.mainFeatures?.storage}</p>
   
    `
    // show the modal  
    show_ditiles_modal.showModal()
}
// HANDLE SEARCH BUTTON 
const handleSerch = (isShowall) => {
    toggleloadingSpinner(true)
    const searchFiled = document.getElementById('search-filed')
    const searchText = searchFiled.value;
    // console.log(searchText); 
    loadPhone(searchText, isShowall)
}
// spinner 
const toggleloadingSpinner = (isLoding) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoding) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// Handle Show All Button 
const handleShowAll = () => {
    handleSerch(true)
}
loadPhone()