import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-custom-dropdown',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDropdownComponent<T> implements ControlValueAccessor, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  _value: string;
  @Input()
  label: string;
  @Input()
  options: T[];
  @Input() set isDisabled(value: boolean) {
    this.renderer.setProperty(this.selectbox, "disabled", !value);
  }
  @ViewChild("selectbox", { static: true }) selectbox: ElementRef;
  @ContentChild("optionTemplate", { static: false })
  optionTemplateRef: TemplateRef<any>;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();
  selectListControl = new FormControl("");

  constructor(private renderer: Renderer2) { }
  onTouched: () => void = () => { };
  writeValue(value: string): void {
    if (value) {
      this.selectListControl.setValue(value, { emitEvent: false });
    } else {
      this.selectListControl.reset("");
    }
  }
  registerOnChange(fn: (value: string) => void) {
    this.selectListControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(fn);
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.selectbox, "disabled", isDisabled);
  }
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
