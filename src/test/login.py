from PyQt5 import QtWidgets
# from mainwindow import Ui_MainWindow

class Login(QtWidgets.QDialog):
    def __init__(self, parent=None):
        super(Login, self).__init__(parent)
        self.textName = QtWidgets.QLineEdit(self)
        self.textCode = QtWidgets.QLineEdit(self)
        self.textPass = QtWidgets.QLineEdit(self)
        self.buttonLogin = QtWidgets.QPushButton('Login', self)
        self.buttonLogin.clicked.connect(self.handleLogin)
        layout = QtWidgets.QVBoxLayout(self)
        layout.addWidget(self.textName)
        layout.addWidget(self.textCode)
        layout.addWidget(self.textPass)
        layout.addWidget(self.buttonLogin)
        self.textName.setText('dstarzhynskyi')
        self.textCode.setText('3264')
        self.textPass.setFocus()


    def handleLogin(self):
        #if (self.textName.text() == 'foo' and
        #    self.textPass.text() == 'bar'):
        if (self.textPass.text().length() == 6):
            self.accept()
        else:
            QtWidgets.QMessageBox.warning(
                self, 'Error', 'Bad user or password '+self.textPass.text().count)

class Window(QtWidgets.QMainWindow):
    def __init__(self, parent=None):
        super(Window, self).__init__(parent)
        # self.ui = Ui_MainWindow()
        # self.ui.setupUi(self)

if __name__ == '__main__':

    import sys
    app = QtWidgets.QApplication(sys.argv)
    login = Login()

    if login.exec_() == QtWidgets.QDialog.Accepted:
        #window = Window()
        #window.show()
        #sys.exit(app.exec_())
        QtWidgets.QMessageBox.warning(
                self, 'Ok', 'Execute cpa...')
