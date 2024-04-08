import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CriteriosActualizarComponent } from './components/criterios-actualizar/criterios-actualizar.component';
import { PasswordModule } from 'primeng/password';
import { ClasificacionCriteriosComponent } from './components/clasificacion-criterios/clasificacion-criterios.component';

import { MultiSelectModule } from 'primeng/multiselect';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginComponent } from './components/Login/Login.component';
import { ToastrModule } from 'ngx-toastr';
import { GestionarPersonaComponent } from './components/gestionar-persona/gestionar-persona.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { GestionarPersonaModule } from './components/gestionar-persona/gestionar-persona.module';
// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputOtpModule } from 'primeng/inputotp';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

import { MeterGroupModule } from 'primeng/metergroup';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { MessageService } from 'primeng/api';
import { MenuComponent } from './components/menu/menu.component';
import { ContenidoCriteriosComponent } from './components/contenido-criterios/contenido-criterios.component';
import { ClasificacionCriteriosActualizarComponent } from './components/clasificacion-criterios-actualizar/clasificacion-criterios-actualizar.component';
import { ClasificacionCriteriosListarComponent } from './components/clasificacion-criterios-listar/clasificacion-criterios-listar.component';
import { CriteriosListarComponent } from './components/criterios-listar/criterios-listar.component';
import { ContenidoPersonaComponent } from './components/contenido-persona/contenido-persona.component';
import { ListarPersonaComponent } from './components/gestionar-persona/listar-persona/listar-persona.component';
import { RegistrarPersonaComponent } from './components/gestionar-persona/registrar-persona/registrar-persona.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { CalificacionListarComponent } from './components/calificacion-listar/calificacion-listar.component';
import { CalificacionActualizarComponent } from './components/calificacion-actualizar/calificacion-actualizar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionarRolComponent } from './components/gestionar-rol/gestionar-rol.component';
import { ListarRolComponent } from './components/gestionar-rol/listar-rol/listar-rol.component';
import { RegistrarRolComponent } from './components/gestionar-rol/registrar-rol/registrar-rol.component';
import { EvaluacionCriteriosComponent } from './components/evaluacion-criterios/evaluacion-criterios.component';
import { EvaluacionCriteriosCalificarComponent } from './components/evaluacion-criterios-calificar/evaluacion-criterios-calificar.component';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { AnalisisUsoComponent } from './components/analisis-uso/analisis-uso.component';
import { ListarPeriodosAcComponent } from './components/gestion-periodo-academico/listar-periodos-ac/listar-periodos-ac.component';
import { RegistrarPeriodoAcComponent } from './components/gestion-periodo-academico/registrar-periodo-ac/registrar-periodo-ac.component';
import { RegistrarAulaComponent } from './components/gestion-aula/registrar-aula/registrar-aula.component';
import { ListarAulasComponent } from './components/gestion-aula/listar-aulas/listar-aulas.component';
import { ActualizarPeriodoAcComponent } from './components/gestion-periodo-academico/actualizar-periodo-ac/actualizar-periodo-ac.component';
import { ActualizarAulaComponent } from './components/gestion-aula/actualizar-aula/actualizar-aula.component';
import { AsignaturaListarComponent } from './components/asignatura-listar/asignatura-listar.component';
import { CarreraListarComponent } from './components/carrera-listar/carrera-listar.component';
import { ContenidoVirtualComponent } from './components/contenido-virtual/contenido-virtual.component';
import { ContenidoAnaliticsComponent } from './components/contenido-analitics/contenido-analitics.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CarreraActualizarComponent } from './components/carrera-actualizar/carrera-actualizar.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { AsignaturaActualizarComponent } from './components/asignatura-actualizar/asignatura-actualizar.component';
import { MainDirectorComponent } from './modules/main-director/main-director.component';
import { UseDirectorComponent } from './modules/use-director/use-director.component';


@NgModule({
  declarations: [
    MainDirectorComponent,
    UseDirectorComponent,
    AsignaturaListarComponent,
    CarreraListarComponent,
    CarreraActualizarComponent,
    AsignaturaActualizarComponent,
    AppComponent,
    LoginComponent,
    MenuComponent,
    CriteriosActualizarComponent,
    CriteriosComponent,
    ClasificacionCriteriosComponent,
    ContenidoCriteriosComponent,
    ClasificacionCriteriosActualizarComponent,
    ClasificacionCriteriosListarComponent,
    CriteriosListarComponent,
    ContenidoPersonaComponent,
    ListarPersonaComponent,
    RegistrarPersonaComponent,
    CalificacionComponent,
    CalificacionListarComponent,
    CalificacionActualizarComponent,
    GestionarRolComponent,
    ListarRolComponent,
    RegistrarRolComponent,
    EvaluacionCriteriosComponent,
    EvaluacionCriteriosCalificarComponent,
    AsignaturaComponent,
    CarreraComponent,
    AnalisisUsoComponent,
    ListarPeriodosAcComponent,
    RegistrarPeriodoAcComponent,
    RegistrarAulaComponent,
    ListarAulasComponent,
    ActualizarPeriodoAcComponent,
    ActualizarAulaComponent,
    ContenidoVirtualComponent,
    ContenidoAnaliticsComponent,
    CarreraActualizarComponent,
    ListarUsuarioComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    InputTextModule,
    SidebarModule,
    TableModule,
    //GestionarPersonaModule,
    AvatarModule,
    AvatarGroupModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputOtpModule,
    ImageModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    MeterGroupModule,
    OrganizationChartModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    StepperModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    CardModule,
    RippleModule,
    StyleClassModule,
    //MatIconModule,
    //CalendarModule,
    //MatFormFieldModule,
    //CalendarModule,
    //MatSelectModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
