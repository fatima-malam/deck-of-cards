console.log("app.js اشتغل")
console.log("Deck =", Deck)

var table = document.getElementById('table')

var shuffleButton = document.getElementById('shuffle')
var flipButton = document.getElementById('flip')
var sortButton = document.getElementById('sort')
var addZoneButton = document.getElementById('add-zone')

console.log("shuffleButton =", shuffleButton)
console.log("flipButton =", flipButton)
console.log("sortButton =", sortButton)

// إنشاء الرزمة

var deck = Deck()

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