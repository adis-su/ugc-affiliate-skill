# AFFILIX — Gadget Category Knowledge

Gadget adalah category knowledge untuk produk elektronik konsumen, perangkat digital, accessories elektronik, smart devices, computer peripherals, mobile accessories, dan produk teknologi sejenis.

Dokumen ini menyediakan **pattern dan considerations**, bukan Product Truth. Informasi spesifik product tetap berasal dari Product Truth dan sumber yang tersedia.

## 1. Category Scope

Gadget dapat mencakup:
- smartphones
- tablets
- laptops
- earbuds
- headphones
- speakers
- smartwatches
- chargers
- power banks
- keyboards
- mice
- cameras
- smart home devices
- electronic accessories
- computer peripherals

Category dapat overlap dengan Home jika gadget digunakan dalam household environment.

## 2. Common Content Contexts

Gadget content sering menggunakan:
- demonstration
- tutorial
- review
- comparison
- unboxing
- problem-solution
- POV
- storytelling
- routine

Format dipilih berdasarkan Content Strategy.

## 3. Product Identity

Gadget identity dapat mencakup:
- brand
- product name
- model
- generation
- variant
- color
- form factor
- dimensions jika diketahui
- ports
- buttons
- controls
- display
- camera modules
- logos
- included accessories
- cable/connector type

Model dan generation harus diperlakukan sebagai identity-critical information.

## 4. Device State

Gadget sering memiliki state yang lebih kompleks.

Contoh:

**Device**
- powered off
- powered on
- locked
- unlocked
- active
- idle
- charging
- connected

**Accessory**
- disconnected
- connected
- held
- placed
- attached

State harus memiliki logical transition.

## 5. Screen State

Screen content adalah bagian dari Product State ketika layar menjadi subject.

Track:
- screen on/off
- application
- page/screen
- UI state
- notification state
- input state
- brightness appearance

Jika exact UI belum diketahui, jangan mengarang UI sebagai factual product interface.

## 6. Connectivity

Connectivity dapat melibatkan:
- wired connection
- Bluetooth
- Wi-Fi
- charging connection
- accessory pairing

Connection state harus memiliki visual or narrative cause.

Contoh:

**Device DISCONNECTED → CABLE CONNECTED → CHARGING**

Jangan langsung membuat charging indicator muncul tanpa connection state jika sequence tersebut penting.

## 7. Controls and Interaction

Perhatikan:
- button position
- touch point
- gesture
- port orientation
- cable placement
- hand position
- physical feedback

Interaction harus sesuai dengan known device design.

Jangan membuat button, port, sensor, atau control yang tidak ada pada product.

## 8. Performance Claims

Gadget content sering menggunakan claims seperti:
- fast
- powerful
- long-lasting
- low latency
- high quality
- durable
- efficient
- stable

Claims tersebut membutuhkan evidence atau Product Truth yang sesuai.

Visual seperti loading animation atau character reaction bukan otomatis bukti performance.

## 9. Battery and Charging

Battery-related content membutuhkan perhatian pada:
- battery state
- charging state
- cable
- adapter
- connector
- indicator
- time context

Jangan mengarang:
- charging speed
- battery capacity
- charging duration
- battery life
- compatibility

kecuali informasi tersebut tersedia dari Product Truth atau source yang sesuai.

## 10. Audio Devices

Untuk earbuds, headphones, dan speakers, visual dapat menunjukkan:
- device identity
- wearing/placement
- pairing
- controls
- playback state
- charging case state

Sound quality adalah sensory/performance claim yang membutuhkan dasar.

Character reaction terhadap audio tidak otomatis membuktikan audio quality.

## 11. Cameras and Imaging Devices

Camera content membutuhkan perhatian pada:
- lens identity
- lens position
- orientation
- recording state
- screen state
- buttons
- accessories
- mount/tripod

Generated footage yang terlihat seperti output camera tidak otomatis membuktikan actual image quality.

## 12. Smart Devices

Smart devices dapat memiliki:
- idle state
- active state
- connected state
- app-controlled state
- notification state
- sensor state

Jika product membutuhkan app, pairing, hub, or ecosystem, relationship tersebut harus berasal dari known product information.

## 13. Accessories and Compatibility

Accessories harus diperlakukan sebagai separate product identities.

Track:
- cable
- adapter
- case
- mount
- dongle
- stylus
- keyboard
- charging dock

Compatibility claims harus memiliki basis.

Jangan membuat accessory terlihat compatible hanya karena connector atau shape terlihat cocok.

## 14. Screen and UI Continuity

Jika layar terlihat dalam beberapa frames, pertahankan:
- device orientation
- app
- UI layout
- text placement
- icons
- visible state

Text atau UI generated secara visual tidak boleh diperlakukan sebagai exact factual interface tanpa source.

## 15. Camera and Framing

Useful gadget framing dapat mencakup:
- product hero shot
- hand-held close-up
- desk setup
- screen close-up
- POV
- over-the-shoulder
- side-by-side comparison
- macro/detail shot

Reflection dan screen glare dapat memengaruhi readability.

## 16. Naturalization

Naturalization dapat mencakup:
- natural hand movement
- finger repositioning
- realistic button press
- subtle camera movement
- autofocus behavior
- screen exposure adjustment
- cable movement
- device weight response

Naturalization tidak boleh:
- menambah port
- mengubah model
- mengubah button layout
- mengubah screen state
- mengubah product identity

## 17. Script Pattern

Gadget content dapat menggunakan:

```text
HOOK
CONTEXT
DEVICE INTRO
SETUP
ACTION / FEATURE
OBSERVABLE RESULT
CONTEXTUAL OBSERVATION
CTA
```

Feature claims harus dipisahkan dari personal preference.

## 18. Storyboard Pattern

Storyboard dapat mendefinisikan:
- device state
- screen state
- accessory state
- connection state
- character interaction
- camera
- environment
- visible UI
- transition

Untuk screen-focused content, reference harus menangkap UI state yang relevan.

## 19. Reference System

Reference State harus menjaga:
- device identity
- model/variant
- orientation
- screen state
- accessory
- cable
- connection state
- character hand position
- environment
- camera

Small changes pada device orientation dapat membuat continuity terasa rusak.

## 20. Comparison

Gadget comparison sering membutuhkan controlled setup.

Perhatikan:
- model/generation
- variant
- firmware/software context jika relevant and known
- accessories
- settings
- lighting
- camera
- test condition

Comparison tidak boleh menyimpulkan performance hanya berdasarkan generated visual.

## 21. Common Category Failure Modes

### Model Drift
Device berubah model atau generation.

### Port/Control Invention
Port, button, sensor, atau control muncul atau hilang.

### Screen Drift
UI atau app berubah antar-frame.

### Connection Teleportation
Device tiba-tiba connected/charging tanpa interaction.

### Accessory Mismatch
Cable, adapter, case, atau accessory tidak cocok.

### Performance Overclaim
Visual result digunakan sebagai bukti performance.

### Battery Invention
Capacity, duration, atau charging speed dibuat-buat.

### Compatibility Invention
Accessory dianggap compatible tanpa source.

### Reflection Confusion
Screen/reflection membuat product identity atau UI berubah.

### Scale Drift
Device berubah ukuran relatif terhadap hand/environment.

## 22. Best Format Pairings

Gadget category sering cocok dengan:
- **Demonstration:** feature atau interaction yang observable.
- **Tutorial:** setup dan workflow.
- **Review:** contextual use dan assessment.
- **Comparison:** model/feature/configuration differences.
- **Unboxing:** device dan included accessories.
- **POV:** hands-on interaction.
- **Problem-Solution:** workflow problem dengan known product role.
- **Routine:** daily device workflow.

Pemilihan format tetap ditentukan oleh Content Strategy.

## 23. Non-Negotiable Rules

1. Model dan generation harus konsisten.
2. Product Identity tidak boleh berubah.
3. Port, button, sensor, dan controls tidak boleh diinvent.
4. Screen State harus dijaga jika layar terlihat.
5. Connection state harus memiliki logical transition.
6. Compatibility claims harus memiliki dasar.
7. Battery dan performance claims harus didukung.
8. Generated UI tidak otomatis menjadi factual UI.
9. Naturalization tidak boleh mengubah device identity.
10. Comparison harus mempertahankan comparable test conditions ketika diperlukan.
