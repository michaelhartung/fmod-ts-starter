// 2024 Michael Hartung <https://hartung.studio>

//------------------------------------------------------------------------------
// REQUIRED: declare global studio object
//------------------------------------------------------------------------------
declare var studio: Fmod.Studio;

//------------------------------------------------------------------------------
// OPTIONAL: declare variables that are in the global scope
//------------------------------------------------------------------------------
declare var __dirname: string;
declare var __filename: string;

//------------------------------------------------------------------------------
// example function using the JS API
//------------------------------------------------------------------------------

function printEventNames(): void {
  const events = studio.project.model.Event.findInstances();
  for (const event of events) {
    studio.system.print(event.name)
  }
}

// make function available in FMOD Studio console
this.printEventNames = printEventNames;

//------------------------------------------------------------------------------
// menu entry example
//------------------------------------------------------------------------------

studio.menu.addMenuItem({
  name: "Example: Open Console",
  execute: () => {
    studio.window.open("Console");
  },
});

//------------------------------------------------------------------------------
// dialog example showcasing different widget types
//------------------------------------------------------------------------------

const uiCheckBox: Fmod.UIWidgetCheckBox = {
  widgetType: studio.ui.widgetType.CheckBox,
  alignment: studio.ui.alignment.AlignTop,
  text: "A CheckBox",
  onToggled: function (): void {
    studio.system.print(`Checkbox checked: ${this.isChecked()}`);
  },
  widgetId: "example_checkbox"
}

const uiComboBox: Fmod.UIWidgetComboBox = {
  widgetType: studio.ui.widgetType.ComboBox,
  alignment: studio.ui.alignment.AlignTop,
  minimumWidth: 100,
  items: [
    {
      text: "Item A",
      userData: []
    }, 
    {
      text: "Item B",
      userData: []
    }
  ],
  currentText: "",
  currentUserData: undefined,
  onCurrentIndexChanged: function (): void {
    studio.system.print(`ComboBox currentIndex: ${this.currentIndex()}`);
  },
  widgetId: "example_combobox"
}

const uiLabel: Fmod.UIWidgetLabel = {
  widgetType: studio.ui.widgetType.Label,
  alignment: studio.ui.alignment.AlignTop,
  text: "This is a Label",
  wordWrap: false,
  widgetId: "example_label"
}

const uiLineEdit: Fmod.UIWidgetLineEdit = {
  widgetType: studio.ui.widgetType.LineEdit,
  alignment: studio.ui.alignment.AlignTop,
  isReadOnly: false,
  echoMode: studio.ui.echoMode.NoEcho,
  onTextEdited: function (): void {
    studio.system.print(`LineEdit text edited: ${this.text()}`);
  },
  onEditingFinished: function (): void {
    studio.system.print(`LineEdit text finished: ${this.text()}`);
  },
  widgetId: "example_lineedit"
}

const uiPathLineEdit: Fmod.UIWidgetPathLineEdit = {
  widgetType: studio.ui.widgetType.PathLineEdit,
  alignment: studio.ui.alignment.AlignTop,
  label: "open dir",
  caption: "open dir",
  pathType: studio.ui.pathType.Directory,
  onEditingFinished: function (): void {
    studio.system.print(`PathLineEdit text: ${this.text()}`);
  },
  widgetId: "example_pathlineedit"
}

const uiPushButton: Fmod.UIWidgetPushButton = {
  widgetType: studio.ui.widgetType.PushButton,
  alignment: studio.ui.alignment.AlignTop,
  text: "Push Button",
  onClicked: function (): void {
    studio.system.print("button pressed");
  },
  widgetId: "example_push_button"
} 

const uiSlider: Fmod.UIWidgetSlider = {
  widgetType: studio.ui.widgetType.Slider,
  alignment: studio.ui.alignment.AlignTop,
  orientation: studio.ui.orientation.Vertical,
  range: { minimum: 0, maximum: 10 },
  onValueChanged: function (): void {
    studio.system.print(`Slider value: ${this.value()}`);
    let spinbox = this.findWidget("example_spinbox");
    if (spinbox) spinbox.setValue(this.value());
  },
  widgetId: "example_slider"
}

const uiSpinBox: Fmod.UIWidgetSpinBox = {
  widgetType: studio.ui.widgetType.SpinBox,
  alignment: studio.ui.alignment.AlignTop,
  range: { minimum: 0, maximum: 10 },
  onValueChanged: function (): void {
    studio.system.print(`SpinBox value: ${this.value()}`);
    let slider = this.findWidget("example_slider");
    if (slider) slider.setValue(this.value());
  },
  widgetId: "example_spinbox"
}

const uiTextEdit: Fmod.UIWidgetTextEdit = {
  widgetType: studio.ui.widgetType.TextEdit,
  isReadOnly: false,
  onTextEdited: function (): void {
    studio.system.print(`Text edit text: ${this.text()}`);
  },
  onEditingFinished: function (): void {
    studio.system.print(`Text edit text finished: ${this.text()}`);
  },
  widgetId: "example_textedit",
}

const uiLayoutRowA: Fmod.UIWidgetLayout = {
  widgetType: studio.ui.widgetType.Layout,
  layout: studio.ui.layoutType.HBoxLayout,
  alignment: studio.ui.alignment.AlignTop,
  items: [
    uiCheckBox,
    uiComboBox,
    uiLabel,
    uiLineEdit,
    uiPushButton,
  ],
  widgetId: "dialog_layout_row_a"
}

const uiLayoutRowB: Fmod.UIWidgetLayout = {
  widgetType: studio.ui.widgetType.Layout,
  layout: studio.ui.layoutType.HBoxLayout,
  alignment: studio.ui.alignment.AlignTop,
  items: [
    uiPathLineEdit,
    uiSlider,
    uiSpinBox,
    uiTextEdit
  ],
  widgetId: "dialog_layout_row_b"
}

const uiLayout: Fmod.UIWidgetLayout = {
  widgetType: studio.ui.widgetType.Layout,
  layout: studio.ui.layoutType.VBoxLayout,
  alignment: studio.ui.alignment.AlignTop,
  items: [
    uiLayoutRowA,
    uiLayoutRowB
  ],
  widgetId: "dialog_layout"
}

//------------------------------------------------------------------------------
// add the modal dialog to the menu
//------------------------------------------------------------------------------
studio.menu.addMenuItem({
  name: "Example: Show Modal",
  execute: () => {
    studio.ui.showModalDialog({
      windowTitle: "Example Dialog",
      widgetId: "example_dialog",
      layout: studio.ui.layoutType.HBoxLayout,
      widgetType: studio.ui.widgetType.Layout,
      alignment: studio.ui.alignment.AlignCenter,
      items: [
        uiLayout
      ],
    });
  },
})