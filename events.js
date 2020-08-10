class Event {
    constructor(name, type, startDate, endDate, priority, premium, eventUrl, description) {
        this.name = name;
        this.eventType = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.premium = premium;
        this.eventUrl = eventUrl;
        this.description = description;
    }
}

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWarning();
        closeDetails();
    }
});

// variables
let selectedEvent = null;
const events = [];
const facebookShare = 'https://facebook.com/sharer.php?display=popup&ref=plugin&src=like&kid_directed_site=0&u=';

const generalDescriptionHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non libero nibh. Sed bibendum finibus tincidunt. Vestibulum nunc purus, viverra et turpis sit amet, condimentum auctor est. Sed quis sodales massa. Sed vitae consectetur est. Aliquam erat volutpat. Duis tristique, ex nec scelerisque imperdiet, risus tellus tempus turpis, non consectetur nulla nibh eu odio. Fusce ac urna et mauris pulvinar interdum quis in dui. In vitae congue felis. Sed scelerisque pharetra urna, et iaculis augue venenatis a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ornare eros sed nisl dictum posuere. Etiam eget mi in quam interdum aliquet. <br/>

Donec lacinia sed erat eget varius. Proin eget lobortis nunc. Nunc eu nisl in risus eleifend elementum nec ac orci. Aliquam lobortis hendrerit rutrum. Fusce et magna elit. Quisque luctus velit vel arcu blandit venenatis in ac arcu. Sed tempus luctus diam, in pharetra sapien cursus quis. Praesent massa dolor, faucibus nec luctus eleifend, dignissim vel sapien. Curabitur vehicula euismod felis, a malesuada mauris mattis in. Aenean tempor luctus sapien a facilisis. Mauris eget mi id nisl lacinia congue ac id odio. Aenean quis pretium sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec euismod feugiat arcu, vitae aliquet ex porta sit amet. Quisque viverra sem nunc, et faucibus turpis fringilla nec. <br/>

Integer id pharetra metus. Nunc congue orci vel blandit pulvinar. In scelerisque sit amet nulla in sagittis. In et pulvinar nisi. Nullam vestibulum, dolor at fringilla tempor, leo nisi porta tortor, vel facilisis odio dui ac lorem. Suspendisse dictum maximus consectetur. Etiam non orci ut risus elementum volutpat.`

function loadEvents() {
    events.push(new Event('Annual Meetup Event', 'MeetUp', new Date('21-10-2020'), null, 10, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Success Case: Sakshi’s Journey from India to Canada', 'Leap', new Date('21-09-2020'), null, 1, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Virtual Hiring Event for Women', 'Recruiting', new Date('21-08-2020'), new Date('23-08-2020'), 10, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Hiring Event for Architects', 'Recruiting', new Date('05-10-2020'), new Date('05-10-2020'), 10, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Success Case: Augustus’s Journey from Nigeria to Australia', 'Leap', new Date('21-11-2020'), null, 1, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Annual Mission', 'Mission', new Date('1-10-2020'), null, 1, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Annual Hackathon', 'Hackathon', new Date('1-12-2020'), new Date('2-12-2020'), 1, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Annual Hackathon for Women', 'Hackathon', new Date('8-12-2020'), new Date('9-12-2020'), 1, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Data Science & Machine Learning Basics', 'Webinar-Premium', new Date('02-09-2020'), new Date('08-09-2020'), 10, true, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Python Basics', 'Webinar-Open', new Date('20-08-2020'), new Date('25-08-2020'), 10, false, 'https://google.com', generalDescriptionHTML));
    events.push(new Event('Data Science & Machine Learning Advanced', 'Webinar-Advanced', new Date('10-09-2020'), new Date('16-09-2020'), 10, true, 'https://google.com', generalDescriptionHTML));

}

function sortEvents() {
    this.events = _.sortBy(events, ['priority', 'startDate']);
}

function renderEvents() {
    loadEvents();
    sortEvents();
    const groupedByEvents = _.groupBy(this.events, 'eventType');
    const eventsListTemplate = document.querySelector('#eventTypeCard');
    const eventContainer = document.getElementsByClassName('event-container')[0];
    const keys = Object.keys(groupedByEvents);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const eventsListClone = eventsListTemplate.content.cloneNode(true);
        const header = eventsListClone.querySelector('.event-list-header');
        header.innerHTML = key;
        const eventsListContent = eventsListClone.querySelector('.events');
        const eventList = groupedByEvents[key];

        for (let j = 0; j < eventList.length; j++) {
            const eventDetails = eventList[j];
            const eventsCardTemplate = document.querySelector('#eventsCard');
            const eventsCardClone = eventsCardTemplate.content.cloneNode(true);
            const card = eventsCardClone.querySelector('.card');
            const cardFooter = eventsCardClone.querySelector('.card-footer');

            addPremiumPriorityClass(eventDetails, card, cardFooter);

            loadFacebookUrl(cardFooter, eventDetails);
            addEventListener(cardFooter, eventDetails);
            const header = eventsCardClone.querySelector('.header');
            const premiumDesign = `<div class="premium-icon"><div class="tooltip"><i class="fa fa-star premium-icon"></i>
                <span class="tooltip-text">Premium</span></div></div>`;
            header.innerHTML = `<span>${eventDetails.name}</span> ${eventDetails.premium ? premiumDesign : ''}`;

            const buttonId = `learnMore-${key.toLowerCase()}-${j}`;
            let shortDescription = eventDetails.description.length > 200 ? `${eventDetails.description.substring(0, 200)}...` : eventDetails.description;
            shortDescription = `${shortDescription} <button type="button" id="${buttonId}" class="detail-link">Learn More</button>`
            const eventContent = eventsCardClone.querySelector('.card-content');
            eventContent.innerHTML = shortDescription;

            const button = eventContent.querySelector(`#${buttonId}`);
            button.addEventListener('click', () => this.openModal(eventDetails));
            eventsListContent.appendChild(eventsCardClone);
        }

        eventContainer.appendChild(eventsListClone);
    }
}

function apply(eventDetails) {
    if (eventDetails.premium) {
        const warningModal = document.querySelector('.modal-warning');
        warningModal.classList.remove('d-none');
        warningModal.classList.add('d-flex');
    } else {
        openToaster(eventDetails);
    }
}

function openToaster(eventDetails) {
    const applyPopup = document.querySelector('.apply-popup');
    applyPopup.innerHTML += `"${eventDetails.name}"`;
    applyPopup.classList.remove('d-none');
    applyPopup.classList.add('d-flex');

    setTimeout(() => {
        applyPopup.classList.add('d-none');
        applyPopup.classList.remove('d-flex');
    }, 5000);
}

function openModal(eventDetails) {
    const detailsModal = document.querySelector('.modal-details');
    const popupFooter = detailsModal.querySelector('.details-popup__footer');
    const detailsPopup = detailsModal.querySelector('.details-popup');
    addPremiumPriorityClass(eventDetails, detailsPopup, popupFooter);

    loadFacebookUrl(popupFooter, eventDetails);
    addEventListener(popupFooter, eventDetails);

    const popupHeader = detailsModal.querySelector('.details-popup__header');
    const premiumDesign = `<div class="premium-icon"><div class="tooltip"><i class="fa fa-star premium-icon"></i>
                <span class="tooltip-text">Premium</span></div></div>`;
    popupHeader.innerHTML += `${eventDetails.premium ? premiumDesign : ''}`;

    const header = popupHeader.querySelector('.header');
    header.textContent = eventDetails.name;
    const eventContent = detailsModal.querySelector('.details-popup__content');
    eventContent.innerHTML = eventDetails.description;

    detailsModal.classList.add('d-flex');
    detailsModal.classList.remove('d-none');
}

function closeDetails() {
    const detailsModal = document.querySelector('.modal-details');
    if (!detailsModal.classList.contains('d-none')) {
        detailsModal.classList.add('d-none');
        detailsModal.classList.remove('d-flex');
    }
}

function closeWarning() {
    const warningModal = document.querySelector('.modal-warning');
    if (!warningModal.classList.contains('d-none')) {
        warningModal.classList.add('d-none');
        warningModal.classList.remove('d-flex');
    }
}

function addPremiumPriorityClass(eventDetails, content, footer) {
    const contentClass = eventDetails.priority === 1 ? 'priority' : (eventDetails.premium ? 'premium' : '');
    const cardFooterClass = eventDetails.priority === 1 ? 'card-footer-priority' : (eventDetails.premium ? 'card-footer-premium' : '');
    footer.classList.remove('card-footer-premium');
    footer.classList.remove('card-footer-priority');
    if (contentClass) {
        content.classList.add(contentClass);
    }

    if (cardFooterClass) {
        footer.classList.add(cardFooterClass);
    }
}

function loadFacebookUrl(footer, eventDetails) {
    const facebookUrl = footer.querySelector('.facebook');
    facebookUrl.addEventListener('click', () => this.popupUrl(eventDetails.eventUrl));
}

function addEventListener(footer, eventDetails) {
    const applyButton = footer.querySelector('.button');
    applyButton.addEventListener('click', () => this.apply(eventDetails))
}

function popupUrl(eventUrl) {
    window.open(`${facebookShare}${eventUrl}`, 'popwin', 'width=640, height=480');
}