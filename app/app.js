console.log("app.js اشتغل")
console.log("Deck =", Deck)

var table = document.getElementById('table')

var shuffleButton = document.getElementById('shuffle')
var flipButton = document.getElementById('flip')
var sortButton = document.getElementById('sort')
var addZoneButton = document.getElementById('add-zone')
var setupGameButton = document.getElementById('setup-game')
var moveDeckButton = document.getElementById('move-deck')
var customizeTableButton = document.getElementById('customize-table')
var customizeModal = document.getElementById('customize-modal')

var closeCustomizeModalButton = document.getElementById('close-customize-modal')

var saveLoadTableButton = document.getElementById('save-load-table')
var saveChoiceModal =
    document.getElementById('save-choice-modal')

var closeSaveChoiceModalButton =
    document.getElementById('close-save-choice-modal')

var saveTableChoice =
    document.getElementById('save-table-choice')

var restoreTableChoice =
    document.getElementById('restore-table-choice')

var saveModal = document.getElementById('save-modal')
var savedTablesList = document.getElementById('saved-tables-list')
var closeSaveModalButton =
    document.getElementById('close-save-modal')
var saveNewModal =
    document.getElementById('save-new-modal')

var saveOptionsList =
    document.getElementById('save-options-list')

var closeSaveNewModalButton =
    document.getElementById('close-save-new-modal')
var gameModal =
    document.getElementById('game-modal')

var gameOneButton =
    document.getElementById('game-one')

var closeGameModalButton =
    document.getElementById('close-game-modal')

var gameInfoModal =
    document.getElementById('game-info-modal')

var gameOneInfoButton =
    document.getElementById('game-one-info')

var closeGameInfoButton =
    document.getElementById('close-game-info')



var isDeckMoving = false


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

var deckElement = table.querySelector('.deck')

var cardSizeOptions =
    document.getElementById('card-size-options')

cardSizeOptions
    .querySelectorAll('button')
    .forEach(function (button) {

        button.addEventListener('click', function () {

            var size =
                button.dataset.size

            deckElement.classList.remove(
                'card-size-small',
                'card-size-medium',
                'card-size-large'
            )

            deckElement.classList.add(
                'card-size-' + size
            )

        })

    })

var cardBackOptions =
    document.getElementById('card-back-options')

cardBackOptions
    .querySelectorAll('button[data-back]')
        .forEach(function (button) {

        button.addEventListener('click', function () {

            cardBackOptions
                .querySelectorAll('button')
                .forEach(function (item) {
                    item.classList.remove('selected')
                })

            button.classList.add('selected')

            var back =
                button.dataset.back

            if (back === 'default') {

                deckElement.classList.remove(
                    'custom-card-back'
                )

                deckElement.style.removeProperty(
                    '--custom-card-back'
                )

            } else {

                deckElement.style.setProperty(
                    '--custom-card-back',
                    'url("images/card-back-' +
                    back +
                    '.jpg")'
                )

                deckElement.classList.add(
                    'custom-card-back'
                )

            }

        })

    })

var cardBackUploadButton =
    document.getElementById('card-back-upload-button')

var cardBackFile =
    document.getElementById('card-back-file')

cardBackUploadButton.addEventListener(
    'click',
    function () {

        cardBackFile.click()

    }
)

cardBackFile.addEventListener(
    'change',
    function () {

        var file = cardBackFile.files[0]

        if (!file) {
            return
        }

        if (file.size > 500 * 1024) {

            alert('حجم الصورة يجب ألا يتجاوز 500 KB')

            cardBackFile.value = ''

            return
        }

        var reader = new FileReader()

        reader.onload = function (event) {

            deckElement.style.setProperty(
                '--custom-card-back',
                'url("' + event.target.result + '")'
            )

            deckElement.classList.add(
                'custom-card-back'
            )

            cardBackOptions
                .querySelectorAll('button')
                .forEach(function (item) {
                    item.classList.remove('selected')
                })

            cardBackUploadButton.classList.add(
                'selected'
            )

        }

        reader.readAsDataURL(file)

    }
)

var tableBackgroundOptions =
    document.getElementById('table-background-options')

tableBackgroundOptions
    .querySelectorAll('button')
    .forEach(function (button) {

        button.addEventListener('click', function () {
            tableBackgroundOptions
        .querySelectorAll('button')
        .forEach(function (item) {
            item.classList.remove('selected')
        })
  button.classList.add('selected')
            var background =
                button.dataset.background

            if (background === 'default') {

                document.body.style.backgroundImage = 'none'
document.body.style.backgroundColor = '#35654d'

            } else {

               document.body.style.backgroundImage =
    'url("images/table-bg-' +
    background +
    '.jpg")'

document.body.style.backgroundSize = 'cover'
document.body.style.backgroundPosition = 'center'
document.body.style.backgroundRepeat = 'no-repeat'

            }

        })

    })

var tableBackgroundUploadButton =
    document.getElementById('table-background-upload-button')

var tableBackgroundFile =
    document.getElementById('table-background-file')

tableBackgroundUploadButton.addEventListener(
    'click',
    function () {

        tableBackgroundFile.click()

    }
)

tableBackgroundFile.addEventListener(
    'change',
    function () {

        var file = tableBackgroundFile.files[0]

        if (!file) {
            return
        }

        if (file.size > 500 * 1024) {

            alert('حجم الصورة يجب ألا يتجاوز 500 KB')

            tableBackgroundFile.value = ''

            return
        }

        var reader = new FileReader()

        reader.onload = function (event) {

            document.body.style.backgroundImage =
                'url("' + event.target.result + '")'

            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundRepeat = 'no-repeat'

        }

        reader.readAsDataURL(file)

    }
)

    var cardBackFile =
    document.getElementById('card-back-file')

cardBackFile.addEventListener('change', function () {

    var file = cardBackFile.files[0]

    if (!file) {
        return
    }

    if (file.size > 500 * 1024) {
        alert('حجم الصورة يجب ألا يتجاوز 500 KB')
        cardBackFile.value = ''
        return
    }

    var reader = new FileReader()

    reader.onload = function (event) {

        deckElement.style.setProperty(
            '--custom-card-back',
            'url("' + event.target.result + '")'
        )

        deckElement.classList.add(
            'custom-card-back'
        )

    }

    reader.readAsDataURL(file)

})

var deckHandle = document.createElement('div')

deckHandle.className = 'deck-handle'
deckHandle.textContent = '↔'

deckElement.appendChild(deckHandle)
var isDraggingDeck = false
var deckOffsetX = 0
var deckOffsetY = 0

deckHandle.addEventListener('mousedown', function (e) {

    if (!isDeckMoving) return

    isDraggingDeck = true

    var deckRect = deckElement.getBoundingClientRect()

    deckOffsetX = e.clientX - deckRect.left
    deckOffsetY = e.clientY - deckRect.top

    deckHandle.style.cursor = 'grabbing'

    e.preventDefault()
    e.stopPropagation()
})

window.addEventListener('mousemove', function (e) {

    if (!isDraggingDeck) return

    var tableRect = table.getBoundingClientRect()

    deckElement.style.left =
        (e.clientX - tableRect.left - deckOffsetX) + 'px'

    deckElement.style.top =
        (e.clientY - tableRect.top - deckOffsetY) + 'px'
})

window.addEventListener('mouseup', function () {

    if (!isDraggingDeck) return

    isDraggingDeck = false

    deckHandle.style.cursor = 'grab'
})

moveDeckButton.addEventListener('click', function () {

    isDeckMoving = !isDeckMoving

    if (isDeckMoving) {

        moveDeckButton.textContent = '✓ إنهاء تحريك الرزمة'
        moveDeckButton.classList.add('active')

        deckHandle.style.display = 'block'

    } else {

        moveDeckButton.textContent = '↔ تحريك الرزمة'
        moveDeckButton.classList.remove('active')

        deckHandle.style.display = 'none'

    }

})
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
    gameModal.classList.add('open')
})
gameOneButton.addEventListener('click', function () {

    setupGame()

    gameModal.classList.remove('open')

})
closeGameModalButton.addEventListener('click', function () {

    gameModal.classList.remove('open')

})

gameOneInfoButton.addEventListener('click', function () {

    gameInfoModal.classList.add('open')

})

closeGameInfoButton.addEventListener('click', function () {

    gameInfoModal.classList.remove('open')

})


var maxZones = 6

customizeTableButton.addEventListener('click', function () {
    console.log('تم الضغط على تخصيص')
})

customizeTableButton.addEventListener('click', function () {
    customizeModal.classList.add('open')
})

closeCustomizeModalButton.addEventListener('click', function () {
    customizeModal.classList.remove('open')
})

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

    isDeckMoving = false

moveDeckButton.textContent = '↔ تحريك الرزمة'
moveDeckButton.classList.remove('active')

deckHandle.style.display = 'none'

moveDeckButton.disabled = true
}

saveLoadTableButton.addEventListener('click', function () {

    saveModal.classList.remove('open')
    saveNewModal.classList.remove('open')

    saveChoiceModal.classList.add('open')

})

closeSaveChoiceModalButton.addEventListener('click', function () {

    saveChoiceModal.classList.remove('open')

})

saveTableChoice.addEventListener('click', function () {

    saveChoiceModal.classList.remove('open')
    saveModal.classList.remove('open')

    showSaveOptions()

})

restoreTableChoice.addEventListener('click', function () {

    saveChoiceModal.classList.remove('open')
    saveNewModal.classList.remove('open')

    showSavedTables()

})

function saveTableState(name) {
console.log('اسم الحفظ المطلوب:', name)
    var state = {

        name: name,

      deck: {
    left: deckElement.style.left,
    top: deckElement.style.top,
    cardSize: deckElement.classList.contains('card-size-large')
        ? 'large'
        : deckElement.classList.contains('card-size-medium')
            ? 'medium'
            : 'small',
    cardBack: deckElement.classList.contains('custom-card-back')
        ? deckElement.style.getPropertyValue('--custom-card-back')
        : 'default'
},
background: {
    image: document.body.style.backgroundImage,
    color: document.body.style.backgroundColor
},

        cards: deck.cards.map(function (card) {

            return {
                i: card.i,
                rank: card.rank,
                suit: card.suit,
                x: card.x,
                y: card.y,
                z: card.z,
                side: card.side
            }

        }),

        zones: []
    }

    var zones = table.querySelectorAll('.zone')

    zones.forEach(function (zone) {

        state.zones.push({
            name: zone.querySelector('.zone-name').textContent,
            left: zone.style.left,
            top: zone.style.top
        })

    })


    // الحصول على الحفظات الموجودة
    var saves =
        JSON.parse(
            localStorage.getItem('card-table-saves')
        ) || []

console.log('الحفظات الموجودة:', saves)
saves.forEach(function (save, index) {
    console.log(
        index,
        '[' + save.name + ']',
        save.name === name
    )
})

    

var existingIndex = saves.findIndex(function (save) {
    return save.name === name
})

if (existingIndex !== -1) {

    saves[existingIndex] = state

} else {

    if (saves.length >= 6) {

        alert('وصلت إلى الحد الأقصى وهو 6 حفظات')

        return
    }

    saves.push(state)
}

localStorage.setItem(
    'card-table-saves',
    JSON.stringify(saves)
)

    console.log('تم حفظ الطاولة باسم:', name)
}
function showSavedTables() {

    var saves =
        JSON.parse(
            localStorage.getItem('card-table-saves')
        ) || []

    savedTablesList.innerHTML = ''

    if (saves.length === 0) {

        savedTablesList.textContent =
            'لا توجد حفظات'

    } else {

        saves.forEach(function (save, index) {

            var row =
                document.createElement('div')

            row.className = 'saved-table-row'


            // زر استعادة الحفظة
            var button =
                document.createElement('button')

            button.className = 'saved-table'
            button.textContent = save.name

            button.addEventListener('click', function () {

                loadTableState(save.name)

                saveModal.classList.remove('open')

            })


            // زر حذف الحفظة
            var deleteButton =
                document.createElement('button')

            deleteButton.className = 'delete-save'
            deleteButton.textContent = 'حذف'

            deleteButton.addEventListener('click', function (event) {

    event.stopPropagation()

    var confirmed =
        confirm('هل أنت متأكد من حذف الحفظة "' + save.name + '"؟')

    if (!confirmed) {
        return
    }

    deleteSavedTable(index)

})


            row.appendChild(button)
            row.appendChild(deleteButton)

            savedTablesList.appendChild(row)

        })
    }
var newSaveButton =
    document.createElement('button')

newSaveButton.className = 'saved-table'
newSaveButton.textContent = '+ حفظ جديد'

newSaveButton.addEventListener('click', function () {

    var name = prompt('اكتب اسم الحفظ الجديد')

    if (!name) {
        return
    }

    saveTableState(name)

    showSavedTables()

})

savedTablesList.appendChild(newSaveButton)
    saveModal.classList.add('open')
}
function showSaveOptions() {

    var saves =
        JSON.parse(
            localStorage.getItem('card-table-saves')
        ) || []

    saveOptionsList.innerHTML = ''


    // الحفظات الموجودة
    saves.forEach(function (save) {

        var button =
            document.createElement('button')

        button.className = 'saved-table'
        button.textContent =
            'تحديث: ' + save.name

        button.addEventListener('click', function () {

            saveTableState(save.name)

            saveNewModal.classList.remove('open')

        })

        saveOptionsList.appendChild(button)

    })


    // حفظ جديد
    var newButton =
        document.createElement('button')

    newButton.className = 'saved-table'
    newButton.textContent = '+ حفظ جديد'

    newButton.addEventListener('click', function () {

        var name = prompt('اكتب اسم الحفظ الجديد')

        if (!name) {
            return
        }

        saveTableState(name)

        saveNewModal.classList.remove('open')

    })

    saveOptionsList.appendChild(newButton)


    saveNewModal.classList.add('open')
}
closeSaveNewModalButton.addEventListener('click', function () {

    saveNewModal.classList.remove('open')

})

function deleteSavedTable(index) {

    var saves =
        JSON.parse(
            localStorage.getItem('card-table-saves')
        ) || []

    saves.splice(index, 1)

    localStorage.setItem(
        'card-table-saves',
        JSON.stringify(saves)
    )

    showSavedTables()
}
closeSaveModalButton.addEventListener('click', function () {

    saveModal.classList.remove('open')

})

saveLoadTableButton.addEventListener('click', function () {

    showSavedTables()

})

function loadTableState(name) {

    var saves =
        JSON.parse(
            localStorage.getItem('card-table-saves')
        ) || []

    var state =
        saves.find(function (save) {
            return save.name === name
        })

    if (!state) {
        console.log('لم يتم العثور على الحفظة:', name)
        return
    }


    // استعادة مكان الرزمة
    if (state.deck) {

        deckElement.style.left =
            state.deck.left

        deckElement.style.top =
            state.deck.top
    }
if (state.deck) {

    deckElement.classList.remove(
        'card-size-small',
        'card-size-medium',
        'card-size-large'
    )

    deckElement.classList.add(
        'card-size-' + state.deck.cardSize
    )

    if (state.deck.cardBack === 'default') {

        deckElement.classList.remove(
            'custom-card-back'
        )

        deckElement.style.removeProperty(
            '--custom-card-back'
        )

    } else {

        deckElement.style.setProperty(
            '--custom-card-back',
            state.deck.cardBack
        )

        deckElement.classList.add(
            'custom-card-back'
        )
    }
}
if (state.background) {

    document.body.style.backgroundImage =
        state.background.image

    document.body.style.backgroundColor =
        state.background.color
}
    // استعادة البطاقات
    if (state.cards) {

        var savedCards = state.cards

        var restoredCards = []

        savedCards.forEach(function (savedCard) {

            var card = deck.cards.find(function (card) {
                return card.i === savedCard.i
            })

            if (!card) return

            // استعادة الوجه
           card.setSide(savedCard.side)

card.x = savedCard.x
card.y = savedCard.y

card.$el.style.transform =
    'translate(' +
    card.x + 'px, ' +
    card.y + 'px)'
            

            // استعادة الطبقة
            card.$el.style.zIndex = savedCard.z

            restoredCards.push(card)
        })

        // استعادة ترتيب المصفوفة
        deck.cards = restoredCards
    }


    // حذف المناطق الحالية
    var currentZones =
        table.querySelectorAll('.zone')

    currentZones.forEach(function (zone) {
        zone.remove()
    })


    // استعادة المناطق المحفوظة
    if (state.zones) {

        state.zones.forEach(function (savedZone) {

            createZone()

            var zones =
                table.querySelectorAll('.zone')

            var zone =
                zones[zones.length - 1]

            zone.style.left =
                savedZone.left

            zone.style.top =
                savedZone.top

            zone.querySelector('.zone-name').textContent =
                savedZone.name

            zone.querySelector('.zone-label').textContent =
                savedZone.name
        })
    }

    console.log('تم استعادة حالة الطاولة')
}


