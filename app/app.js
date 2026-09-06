console.log("app.js اشتغل")
console.log("Deck =", Deck)

var table = document.getElementById('table')

var shuffleButton = document.getElementById('shuffle')
var flipButton = document.getElementById('flip')
var sortButton = document.getElementById('sort')
var addZoneButton = document.getElementById('add-zone')
var setupGameButton = document.getElementById('setup-game')

console.log("shuffleButton =", shuffleButton)
console.log("flipButton =", flipButton)
console.log("sortButton =", sortButton)

// إنشاء الرزمة

var deck = Deck(true)
console.log("عدد البطاقات:", deck.cards.length)

deck.cards.forEach(function (card) {
    console.log(
        "i:", card.i,
        "rank:", card.rank,
        "suit:", card.suit
    )
})

function isJoker(card) {
    return card.suit === 4
}
deck.cards.forEach(function (card) {
    if (isJoker(card)) {
        console.log("وجدنا جوكر:", card.i)
    }
})

var jokers = deck.cards.filter(function (card) {
    return isJoker(card)
})

console.log("عدد الجوكرات:", jokers.length)

var removedJoker = jokers[2]

var index = deck.cards.indexOf(removedJoker)
removedJoker.unmount()
deck.cards.splice(index, 1)

console.log("عدد البطاقات بعد إزالة الجوكر:", deck.cards.length)


console.log("عدد البطاقات في الرزمة:", deck.cards.length)

var jokers = deck.cards.filter(function (card) {
    return card.suit === 4
})

var joker1 = jokers[0]
var joker2 = jokers[1]

// تفعيل السحب والقلب

deck.cards.forEach(function (card) {
    card.enableDragging()
    card.enableFlipping()
})

// وضع الرزمة على الطاولة

deck.mount(table)

// اختبار الأزرار

shuffleButton.addEventListener('click', function () {
    deck.shuffle()
})

flipButton.addEventListener('click', function () {
    deck.flip()
})

sortButton.addEventListener('click', function () {
    deck.sort()
})

addZoneButton.addEventListener('click', function () {
    createZone()
})

setupGameButton.addEventListener('click', function () {
    setupGame()
})

var maxZones = 6

function createZone() {

    var currentZones =
        table.querySelectorAll('.zone').length

    if (currentZones >= maxZones) {
        alert('وصلت إلى الحد الأقصى للمناطق: 6')
        return
    }

    var zone = document.createElement('div')

    zone.className = 'zone'

    var column = currentZones % 3
    var row = Math.floor(currentZones / 3)

    zone.style.left = (80 + column * 170) + 'px'
    zone.style.top = (100 + row * 230) + 'px'


    var zoneName = document.createElement('div')
    zoneName.className = 'zone-name'
    zoneName.textContent = 'منطقة جديدة'

    var zoneLabel = document.createElement('div')
    zoneLabel.className = 'zone-label'
    zoneLabel.textContent = 'منطقة جديدة'

    zone.appendChild(zoneName)
    zone.appendChild(zoneLabel)

    table.appendChild(zone)

    zone.isEditing = false

    makeZoneDraggable(zone)
    addZoneActions(zone)
}


function makeZoneDraggable(zone) {
    var isDragging = false
    var offsetX = 0
    var offsetY = 0

    zone.addEventListener('mousedown', function (e) {

        // لا تتحرك المنطقة إلا في وضع التعديل
        if (!zone.isEditing) return

        isDragging = true

        var rect = zone.getBoundingClientRect()

        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top
    })

    window.addEventListener('mousemove', function (e) {

        if (!isDragging) return
        if (!zone.isEditing) return

        var tableRect = table.getBoundingClientRect()

        zone.style.left =
            (e.clientX - tableRect.left - offsetX) + 'px'

        zone.style.top =
            (e.clientY - tableRect.top - offsetY) + 'px'
    })

    window.addEventListener('mouseup', function () {
        isDragging = false
    })
}


function addZoneActions(zone) {

    zone.addEventListener('dblclick', function (e) {

        e.stopPropagation()

        // إذا كانت في وضع التعديل، ننهي التعديل
        if (zone.isEditing) {
            exitZoneEditMode(zone)
            return
        }

        // الدخول إلى وضع التعديل
        enterZoneEditMode(zone)
    })


    function enterZoneEditMode(zone) {

        zone.isEditing = true
        zone.classList.add('selected')

        var actions = document.createElement('div')
        actions.className = 'zone-actions'

        var editButton = document.createElement('button')
        editButton.textContent = '✏️ تعديل'

        var deleteButton = document.createElement('button')
        deleteButton.textContent = '🗑️ حذف'

        actions.appendChild(editButton)
        actions.appendChild(deleteButton)

        zone.appendChild(actions)


        editButton.addEventListener('click', function (e) {

            e.stopPropagation()

            var zoneName =
                zone.querySelector('.zone-name')

            var zoneLabel =
                zone.querySelector('.zone-label')

            var newName = prompt(
                'اكتب اسم المنطقة:',
                zoneName.textContent
            )

            if (newName && newName.trim() !== '') {

                newName = newName.trim()

                zoneName.textContent = newName
                zoneLabel.textContent = newName
            }
        })


        deleteButton.addEventListener('click', function (e) {

            e.stopPropagation()

            zone.remove()
        })
    }


    function exitZoneEditMode(zone) {

        zone.isEditing = false

        zone.classList.remove('selected')

        var actions =
            zone.querySelector('.zone-actions')

        if (actions) {
            actions.remove()
        }
    }
}

function setupGame() {

    console.log("تم الضغط على زر تجهيز اللعبة")
if (!deck.cards.includes(joker1)) {
    console.log("اللعبة مجهزة مسبقًا")
    return
}
  
    // إزالة الجوكرين من الرزمة مؤقتًا
    joker1.unmount()
    joker2.unmount()

    deck.cards.splice(deck.cards.indexOf(joker1), 1)
    deck.cards.splice(deck.cards.indexOf(joker2), 1)

    console.log("تم استخراج الجوكرين")
    console.log("عدد البطاقات المتبقية:", deck.cards.length)

// خلط الـ52 بطاقة
deck.shuffle()

// حجز 10 بطاقات
var reservedCards = deck.cards.slice(0, 10)

// البطاقات المتبقية
var remainingCards = deck.cards.slice(10)

console.log("عدد البطاقات المحجوزة:", reservedCards.length)
console.log("عدد البطاقات المتبقية:", remainingCards.length)
// تقسيم البطاقات المتبقية إلى مجموعتين
var middle = Math.floor(remainingCards.length / 2)

var pile1 = remainingCards.slice(0, middle)
var pile2 = remainingCards.slice(middle)

console.log("المجموعة الأولى:", pile1.length)
console.log("المجموعة الثانية:", pile2.length)
// خلط كل مجموعة
pile1.sort(function () {
    return Math.random() - 0.5
})

pile2.sort(function () {
    return Math.random() - 0.5
})

// اختيار مكان عشوائي للجوكر
var joker1Position =
    Math.floor(Math.random() * (pile1.length + 1))

var joker2Position =
    Math.floor(Math.random() * (pile2.length + 1))

// إدخال الجوكرين
pile1.splice(joker1Position, 0, joker1)
pile2.splice(joker2Position, 0, joker2)

console.log("مكان الجوكر الأول:", joker1Position)
console.log("مكان الجوكر الثاني:", joker2Position)

console.log("حجم المجموعة الأولى:", pile1.length)
console.log("حجم المجموعة الثانية:", pile2.length)

// إعادة تجميع الرزمة
deck.cards = pile1.concat(reservedCards, pile2)
arrangeDeck()

}

function arrangeDeck() {
    deck.cards.forEach(function (card, index) {
        card.pos = index
        card.shuffle(function () {})
    })
}

